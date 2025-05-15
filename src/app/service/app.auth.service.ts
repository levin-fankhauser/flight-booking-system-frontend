import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private usernameSubject = new BehaviorSubject<string>('');
  public readonly usernameObservable = this.usernameSubject.asObservable();

  private useraliasSubject = new BehaviorSubject<string>('');
  public readonly useraliasObservable = this.useraliasSubject.asObservable();

  private accessTokenSubject = new BehaviorSubject<string>('');
  public readonly accessTokenObservable =
    this.accessTokenSubject.asObservable();

  private rolesSubject = new BehaviorSubject<string[]>([]);
  public readonly rolesObservable = this.rolesSubject.asObservable();

  private _decodedAccessToken: any;
  get decodedAccessToken() {
    return this._decodedAccessToken;
  }

  private _accessToken = '';
  get accessToken() {
    return this._accessToken;
  }

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig
  ) {
    this.handleEvents(null);

    this.accessTokenObservable.subscribe((token) => {
      const decoded = this.jwtHelper.decodeToken(token);
      const rolesRaw =
        decoded?.resource_access?.['flight-booking-system']?.roles;

      const roles = Array.isArray(rolesRaw)
        ? rolesRaw.map((r: string) => r.replace('ROLE_', ''))
        : rolesRaw
        ? [rolesRaw.replace('ROLE_', '')]
        : [];

      this.rolesSubject.next(roles);
    });
  }

  async initAuth(): Promise<any> {
    return new Promise<void>(() => {
      this.oauthService.configure(this.authConfig);
      this.oauthService.events.subscribe((e) => this.handleEvents(e));
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.oauthService.setupAutomaticSilentRefresh();
    });
  }

  public getRoles(): Observable<string[]> {
    return this.rolesObservable;
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  public hasRole(role: string): Observable<boolean> {
    return this.getRoles().pipe(map((roles) => roles.includes(role)));
  }

  public logout() {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
    this.rolesSubject.next([]);
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  private handleEvents(event: any) {
    if (event instanceof OAuthErrorEvent) {
      // console.error(event);
    } else {
      this._accessToken = this.oauthService.getAccessToken();
      this.accessTokenSubject.next(this._accessToken);
      this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

      if (
        this._decodedAccessToken?.family_name &&
        this._decodedAccessToken?.given_name
      ) {
        const username =
          this._decodedAccessToken?.given_name +
          ' ' +
          this._decodedAccessToken?.family_name;
        this.usernameSubject.next(username);
      }

      const claims = this.getIdentityClaims();
      if (claims !== null) {
        if (claims['preferred_username'] !== '') {
          this.useraliasSubject.next(claims['preferred_username']);
        }
      }
    }
  }
}

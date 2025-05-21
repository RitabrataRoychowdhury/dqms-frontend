export interface NewRealmDto {
  realm: string;
  displayName: string;
  displayNameHtml: string;
  enabled: boolean;
  sslRequired: string;
  registrationAllowed: boolean;
  registrationEmailAsUsername: boolean;
  editUsernameAllowed: boolean;
  resetPasswordAllowed: boolean;
  verifyEmail: boolean;
  rememberMe: boolean;
  loginWithEmailAllowed: boolean;
  duplicateEmailsAllowed: boolean;
  adminUsername: string;
  adminPassword: string;
}

export interface IRealmService {
  createRealm(realmData: NewRealmDto): Promise<any>;
}

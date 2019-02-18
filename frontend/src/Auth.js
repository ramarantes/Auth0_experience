import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'ramarantes.auth0.com',
      audience: 'https://ramarantes.auth0.com/userinfo',
      clientID: 'JoroSWgijQi8cTn2mjCMrLTCUCWXrjI8',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

    //this.restoreLocalStorage();
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
       
        //localStorage.setItem('authResult', JSON.stringify({idToken: authResult.idToken,profile: authResult.profile, expiresAt: this.expiresAt }));
        resolve();
      });
    })
  }
  setSession(authResult){
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  // restoreLocalStorage(){
    
  //   var x = JSON.parse(localStorage.getItem('authResult'));
  //   console.log('%c restoreLocalStorage called','background-color:red;');
  //   console.log(x);
  //   if(x){
  //     this.idToken = x.idToken;
  //     this.profile = x.profile;
  //     debugger;
  //     // set the time that the id token will expire at
  //     this.expiresAt = x.expiresAt;

      
  //   }
  // }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'JoroSWgijQi8cTn2mjCMrLTCUCWXrjI8',
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
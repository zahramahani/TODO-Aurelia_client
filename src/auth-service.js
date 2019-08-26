import { Aurelia, inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
// import config from 'config';

@inject(Aurelia, HttpClient)
export default class AuthService {

    session = null

    // As soon as the AuthService is created, we query local storage to
    // see if the login information has been stored. If so, we immediately
    // load it into the session object on the AuthService.
    constructor(Aurelia, HttpClient) {
        HttpClient.configure(http => {
            http.withBaseUrl('http://localhost:3001/api/');
        });

        this.httpClient = HttpClient;
        this.app = Aurelia;

        // this.session = JSON.parse(localStorage[config.tokenName] || null);
    }

    async login(user, passwd) {
        const response = await this.httpClient.fetch('login', {
            method: 'POST',
            body: json({
                userName: user,
                password: passwd
            })
        });
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
        return data;
    }

    async signup(frstName, lastName, user, passwd) {

        let signupData = {
            firstName: frstName,
            lastName: lastName,
            userName: user,
            password: passwd
        }

        const response = await this.httpClient.fetch(`signup`, {
            method: 'POST',
            body: JSON.stringify(signupData)
        });

        const data = await response.json();

        return data;
    }

    logout() {

        // Clear from localStorage
        localStorage['userToken'] = null;

        // .. and from the session object


        // .. and set root to login.
        this.app.setRoot('signup')
    }

    isAuthenticated() {
        // localStorage['userToken'] = null; 
        return !localStorage['userToken'] === null;
    }

    can(permission) {
        return true; // why not?
    }
}
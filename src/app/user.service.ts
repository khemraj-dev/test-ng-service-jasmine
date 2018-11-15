import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private loggedIn: boolean = false;

  constructor(private http: Http) { }

  isLoggedIn() {
    return this.loggedIn;
  }

  login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      '/login',
      JSON.stringify(credentials),
      { headers }
    );
  }
}
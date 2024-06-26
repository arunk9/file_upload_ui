import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export const AUTH_API = environment.apiBaseUrl || 'http://localhost:8000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}/login`,
      {
        username,
        password,
      },
      httpOptions
    );
  }
}

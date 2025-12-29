import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { token } from '../../interfaces/token';
import { responseMessage } from '../../interfaces/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly token = environment.storageNames.token;
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.storageNames.token);
    return !!token;
  }

  login(email: string, password: string): Observable<token> {
    return this.http.post<token>(`${this.apiUrl}/sessions`, { email, password });
  }
  setToken(token: string): void {
    localStorage.setItem(environment.storageNames.token, token);
  }
  getToken(): string | null {
    return localStorage.getItem(environment.storageNames.token);
  }
  clearToken(): void {
    localStorage.removeItem(environment.storageNames.token);
    localStorage.removeItem(environment.storageNames.user);
  }
}

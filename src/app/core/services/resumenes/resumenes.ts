import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { resumProducts } from '../../interfaces/resumProducts';

@Injectable({
  providedIn: 'root',
})
export class Resumenes {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getResumenForUser(): Observable<resumProducts[]> {
    return this.http.get<resumProducts[]>(`${this.apiUrl}/orders/resumen/usuario`);
  }
}

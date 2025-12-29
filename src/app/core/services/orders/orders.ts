import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { responseMessage } from '../../interfaces/responseMessage';
@Injectable({
  providedIn: 'root',
})
export class Orders {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  
  createOrder(orderData: any): Observable<responseMessage> {
    return this.http.post<responseMessage>(`${this.apiUrl}/orders`, orderData);
  }
}

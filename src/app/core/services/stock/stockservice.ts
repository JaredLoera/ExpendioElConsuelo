import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../../interfaces/stock';
import { product } from '../../interfaces/product';
import { responseMessage } from '../../interfaces/responseMessage';

@Injectable({
  providedIn: 'root',
})
export class Stockservice {
  private apiUrl = environment.apiUrl;;
  constructor(private http: HttpClient) {}
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/stocks`);
  }

  ///stock-products/brand/{brandId}
  getStockByBrand(brandId: number): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/stock-products/brand/${brandId}`);
  }
updateStockProduct(stockId: number, packageUnits: number): Observable<responseMessage> {
    return this.http.put<responseMessage>(`${this.apiUrl}/stock-products/${stockId}`, { packageUnits });
  }

}
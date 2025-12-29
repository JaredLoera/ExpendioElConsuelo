import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { brand } from '../../interfaces/brand';
import { product } from '../../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class Products {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<brand[]> {
    return this.http.get<brand[]>(`${this.apiUrl}/brands`);
  }

  getProductsByBrand(brandId: number): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/brands/${brandId}/products`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Category } from '../models/category.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private readonly API = `${environment.baseUrl}/categories`;

  constructor(private http: HttpClient) {}

  findById(id) {
    return this.http.get<Category>(`${this.API}/${id}`).pipe(take(1));
  }

  findAll(page: string, size: string): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(`${this.API}?`, {
      params: { page: page, size: size },
      observe: 'response',
    });
  }

  private insert(category) {
    return this.http.post(this.API, category).pipe(take(1));
  }

  private update(category) {
    return this.http.put(`${this.API}/${category.id}`, category).pipe(take(1));
  }

  public delete(id) {
    return this.http.delete(`${this.API}/${id}`, id).pipe(take(1));
  }

  public save(category) {
    if(category.id) {
      return this.update(category);
    } else {
      return this.insert(category);
    }
  }

}

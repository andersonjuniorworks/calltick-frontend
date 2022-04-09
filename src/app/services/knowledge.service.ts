import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { Knowledge } from '../models/knowledge.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {

  private readonly API = `${environment.baseUrl}/knowledges`;

  constructor(private http: HttpClient) {}

  findById(id) {
    return this.http.get<Knowledge>(`${this.API}/${id}`).pipe(take(1));
  }

  findByDescription(description: string): Observable<HttpResponse<Knowledge[]>> {
    const $todo = this.http
    .get<Knowledge[]>(`${this.API}/description?`, {
      params: { value: description },
      observe: 'response',
    })
    return $todo;
  }

  findAll(page: string, size: string): Observable<HttpResponse<Knowledge[]>> {
    return this.http.get<Knowledge[]>(`${this.API}?`, {
      params: { page: page, size: size },
      observe: 'response',
    });
  }

  public insert(knowledge) {
    return this.http.post(this.API, knowledge).pipe(take(1));
  }

}

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly API = `${environment.baseUrl}/comments`;

  constructor(private http: HttpClient) {}

  findByTicket(id) {
    return this.http.get<Comment[]>(`${this.API}/${id}`).pipe(take(1));
  }

  public insert(comment) {
    console.log(comment)
    return this.http.post(this.API, comment).pipe(take(1));
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './../../app/post/post';
import { Album } from './../../app/album/album';
import { Todos } from './../../app/todos/todos';

@Injectable({
  providedIn: 'root'
})
export class DesafioService {

  private apiURL = "https://jsonplaceholder.typicode.com";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Postagens

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/posts/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createPost(post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deletePost(id) {
    return this.httpClient.delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Albuns

  getAllAlbuns(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.apiURL + '/albums/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createAlbum(album): Observable<Album> {
    return this.httpClient.post<Album>(this.apiURL + '/albums/', JSON.stringify(album), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteAlbum(id) {
    return this.httpClient.delete<Album>(this.apiURL + '/albums/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // To-Do's

  getAllTodos(): Observable<Todos[]> {
    return this.httpClient.get<Todos[]>(this.apiURL + '/todos/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createTodo(todo): Observable<Todos> {
    return this.httpClient.post<Todos>(this.apiURL + '/todos/', JSON.stringify(todo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteTodo(id) {
    return this.httpClient.delete<Todos>(this.apiURL + '/todos/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
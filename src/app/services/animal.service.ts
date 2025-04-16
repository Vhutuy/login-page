import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = 'https://patas-backend.onrender.com/animais';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<any[]> {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('Token não encontrado no sessionStorage.');
      return throwError(() => new Error('Token de autenticação ausente.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  cadastrarAnimal(formData: FormData): Observable<any> {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('Token não encontrado no sessionStorage.');
      return throwError(() => new Error('Token de autenticação ausente.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, formData, { headers });
  }
}

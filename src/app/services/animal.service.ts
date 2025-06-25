import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = 'https://patas-backend.onrender.com/animais';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<any[]> {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('Token não encontrado no sessionStorage.');
      return throwError(() => new Error('Token de autenticação ausente.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  cadastrarAnimalJson(animalData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('Token não encontrado no sessionStorage.');
      return throwError(() => new Error('Token de autenticação ausente.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl, JSON.stringify(animalData), { headers });
  }


  buscarPorId(id: string): Observable<any> {
  const token = sessionStorage.getItem('auth-token');
  if (!token) {
    return throwError(() => new Error('Token de autenticação ausente.'));
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`https://patas-backend.onrender.com/animais/${id}`, { headers });
}


}

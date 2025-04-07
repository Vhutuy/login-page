import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = 'https://patas-backend.onrender.com/animais';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<any[]> {
    const token = sessionStorage.getItem('auth-token'); // Verifique se o token está no sessionStorage
    if (!token) {
      throw new Error('Token não encontrado no sessionStorage!');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Adicione o token JWT no cabeçalho
    });

    return this.http.get<any[]>(this.baseUrl, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Animal {
  id: string;
  especie: string;
  raca: string;
  cor: string;
  tamanho: string;
  sexo: string;
  idade: number;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:8080/animais';
  
  constructor(private http: HttpClient) { }

  // Método para pegar os animais com o token no cabeçalho
  getAnimais(): Observable<Animal[]> {
    const authToken = sessionStorage.getItem('auth-token');
if (authToken) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });

  return this.http.get<Animal[]>(this.apiUrl, { headers }).pipe(
    catchError((error) => {
      console.error('Erro na requisição:', error);
      if (error.status === 403) {
        console.error('Erro 403: Permissão negada. Verifique seu token.');
      } else if (error.status === 401) {
        console.error('Erro 401: Token inválido ou ausente.');
      }
      return throwError(error); // Retorna o erro para ser tratado na camada superior
    })
  );
} else {
  console.error('Token de autenticação não encontrado');
  return throwError('Token de autenticação não encontrado');
}
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent {
  userName: string | null = ''; // Variável para armazenar o nome do usuário

  constructor() {
    this.userName = sessionStorage.getItem('userName'); // Busca o nome do usuário no sessionStorage
  }
}

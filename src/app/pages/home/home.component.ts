import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('navLinks') navLinks!: ElementRef;
  @ViewChild('menuBtnIcon') menuBtnIcon!: ElementRef;
  
  user: string | null;
  animais: any[] = []; // Lista para armazenar os animais
  paginaAtual: number = 0; // Página atual
  itensPorPagina: number = 9; // Número de itens por página (3x6)

  constructor(private animalService: AnimalService) {
    this.user = sessionStorage.getItem("userName");
  }

  ngOnInit(): void {
    this.carregarAnimais(); // Carregar os animais ao iniciar o componente
  }

  ngAfterViewInit(): void {
    // Menu Toggle
    this.menuBtn.nativeElement.addEventListener('click', () => {
      const navLinksEl = this.navLinks.nativeElement;
      const menuBtnIconEl = this.menuBtnIcon.nativeElement;

      navLinksEl.classList.toggle('open');
      const isOpen = navLinksEl.classList.contains('open');
      menuBtnIconEl.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line');
    });

    this.navLinks.nativeElement.addEventListener('click', () => {
      const navLinksEl = this.navLinks.nativeElement;
      const menuBtnIconEl = this.menuBtnIcon.nativeElement;

      navLinksEl.classList.remove('open');
      menuBtnIconEl.setAttribute('class', 'ri-menu-line');
    });

    // ScrollReveal
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000,
    };

    ScrollReveal().reveal('.header__content h4', { ...scrollRevealOption });
    ScrollReveal().reveal('.header__content h1', { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal('.header__content h2', { ...scrollRevealOption, delay: 1000 });
    ScrollReveal().reveal('.header__content p', { ...scrollRevealOption, delay: 1500 });
    ScrollReveal().reveal('.header__btn', { ...scrollRevealOption, delay: 2000 });
  }

  carregarAnimais(): void {
    this.animalService.buscarTodos().subscribe({
      next: (data: any[]) => {
        this.animais = data; // Armazena os animais retornados do backend
      },
      error: (err: any) => {
        console.error('Erro ao buscar animais:', err);
      }
    });
  }

  get animaisPaginados() {
    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.animais.slice(inicio, fim); // Retorna os animais da página atual
  }

  proximaPagina(): void {
    if ((this.paginaAtual + 1) * this.itensPorPagina < this.animais.length) {
      this.paginaAtual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
    }
  }

  buscarFiltro(): void {
    const tamanho = (document.getElementById('tamanho') as HTMLInputElement).value;
    const sexo = (document.getElementById('sexo') as HTMLInputElement).value;
    const idadeMin = (document.getElementById('idade-min') as HTMLInputElement).value;
    const idadeMax = (document.getElementById('idade-max') as HTMLInputElement).value;

    console.log({ tamanho, sexo, idadeMin, idadeMax });
  }

  limparFiltros(): void {
    (document.getElementById('tamanho') as HTMLInputElement).value = '';
    (document.getElementById('sexo') as HTMLInputElement).value = '';
    (document.getElementById('idade-min') as HTMLInputElement).value = '';
    (document.getElementById('idade-max') as HTMLInputElement).value = '';
  }

  
}

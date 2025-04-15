import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements AfterViewInit, OnInit {
onRacaChange($event: Event) {
throw new Error('Method not implemented.');
}
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('navLinks') navLinks!: ElementRef;
  @ViewChild('menuBtnIcon') menuBtnIcon!: ElementRef;

  user: string | null;
  animais: any[] = [];
  animaisFiltrados: any[] = [];
  paginaAtual: number = 0;
  itensPorPagina: number = 9;

  filtros = {
    especie: '',
    raca: '',
    genero: [] as string[],
    cor: [] as string[],
    idadeMin: null as number | null,
    idadeMax: null as number | null,
    tamanho: [] as string[]
  };

  router: any;

  constructor(private animalService: AnimalService) {
    this.user = sessionStorage.getItem("userName");
  }

  ngOnInit(): void {
    this.carregarAnimais();
  }

  ngAfterViewInit(): void {
    this.menuBtn?.nativeElement.addEventListener('click', () => {
      const navLinksEl = this.navLinks?.nativeElement;
      const menuBtnIconEl = this.menuBtnIcon?.nativeElement;

      if (navLinksEl && menuBtnIconEl) {
        navLinksEl.classList.toggle('open');
        const isOpen = navLinksEl.classList.contains('open');
        menuBtnIconEl.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line');
      }
    });

    this.navLinks?.nativeElement.addEventListener('click', () => {
      const navLinksEl = this.navLinks?.nativeElement;
      const menuBtnIconEl = this.menuBtnIcon?.nativeElement;

      if (navLinksEl && menuBtnIconEl) {
        navLinksEl.classList.remove('open');
        menuBtnIconEl.setAttribute('class', 'ri-menu-line');
      }
    });

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
        this.animais = data;
        this.filtrarAnimais();
      },
      error: (err: any) => {
        console.error('Erro ao buscar animais:', err);
      }
    });
  }

  filtrarAnimais(): void {
    this.animaisFiltrados = this.animais.filter(animal => {
      const especieOk = !this.filtros.especie || animal.especie === this.filtros.especie;
      const racaOk = !this.filtros.raca || animal.raca === this.filtros.raca;
      const generoOk = this.filtros.genero.length === 0 || this.filtros.genero.includes(animal.sexo);
      const corOk = this.filtros.cor.length === 0 || this.filtros.cor.includes(animal.cor);
      const idadeOk =
        (this.filtros.idadeMin === null || animal.idade >= this.filtros.idadeMin) &&
        (this.filtros.idadeMax === null || animal.idade <= this.filtros.idadeMax);
      const tamanhoOk = this.filtros.tamanho.length === 0 || this.filtros.tamanho.includes(animal.tamanho);

      return especieOk && racaOk && generoOk && corOk && idadeOk && tamanhoOk;
    });
  }

  get animaisPaginados() {
    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.animaisFiltrados.slice(inicio, fim);
  }

  proximaPagina(): void {
    if ((this.paginaAtual + 1) * this.itensPorPagina < this.animaisFiltrados.length) {
      this.paginaAtual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
    }
  }

  onFiltroChange(): void {
    this.paginaAtual = 0;
    this.filtrarAnimais();
  }

  onEspecieChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtros.especie = target.value;
    this.onFiltroChange();
  }

  onIdadeChange(tipo: 'min' | 'max', event: Event): void {
    const target = event.target as HTMLInputElement;
    const valor = target.valueAsNumber;

    if (tipo === 'min') {
      this.filtros.idadeMin = isNaN(valor) ? null : valor;
    } else {
      this.filtros.idadeMax = isNaN(valor) ? null : valor;
    }

    this.onFiltroChange();
  }

  onCheckChange(event: Event, campo: 'genero' | 'cor' | 'tamanho') {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (target.checked) {
      this.filtros[campo].push(value);
    } else {
      this.filtros[campo] = this.filtros[campo].filter((v: string) => v !== value);
    }

    this.onFiltroChange();
  }
}

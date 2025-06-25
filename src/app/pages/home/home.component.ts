import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';
import { CommonModule } from '@angular/common';
import { AnimalService } from '../../services/animal.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, NavBarComponent, RouterLink, RouterOutlet]
})
export class HomeComponent implements OnInit {

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

  mostrarRacas: boolean = false;
  coresDisponiveis: string[] = [];
  coresPrincipais: string[] = ['Preto', 'Branco', 'Vermelho', 'Damasco', 'Cinza', 'Azul', 'Marrom'];

  constructor(private router:Router ,private animalService: AnimalService) {
    this.user = sessionStorage.getItem("userName");
  }

  ngOnInit(): void {
    this.carregarAnimais();
  }

  carregarAnimais(): void {
    this.animalService.buscarTodos().subscribe({
      next: (data: any[]) => {
        this.animais = data;
        this.gerarCoresDisponiveis();
        this.filtrarAnimais();
      },
      error: (err: any) => {
        console.error('Erro ao buscar animais:', err);
      }
    });
  }

  gerarCoresDisponiveis(): void {
    const todasCores = this.animais.map(animal => animal.cor);
    const coresUnicas = Array.from(new Set(todasCores)).sort();

    const principais = coresUnicas.filter(cor => this.coresPrincipais.includes(cor));
    const outras = coresUnicas.filter(cor => !this.coresPrincipais.includes(cor));

    this.coresDisponiveis = [...principais];
    if (outras.length > 0) {
      this.coresDisponiveis.push('OUTRAS');
    }
  }

filtrarAnimais(): void {
  this.animaisFiltrados = this.animais.filter(animal => {
    const especieOk = !this.filtros.especie || animal.especie === this.filtros.especie;
    const racaOk = !this.filtros.raca || animal.raca === this.filtros.raca;
    const generoOk = this.filtros.genero.length === 0 || this.filtros.genero.includes(animal.sexo);

    const corSelecionadas = this.filtros.cor;
    const corEstaEmPrincipais = this.coresPrincipais.includes(animal.cor);

    let corOk = true;
    if (corSelecionadas.length > 0) {
      if (corSelecionadas.includes('OUTRAS')) {
        corOk = !corEstaEmPrincipais;
      } else {
        corOk = corSelecionadas.includes(animal.cor);
      }
    }

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
    const especieSelecionada = target.value;
    this.filtros.especie = especieSelecionada;

    this.mostrarRacas = especieSelecionada === 'CACHORRO';
    this.filtros.raca = '';

    this.onFiltroChange();
  }

  onRacaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filtros.raca = target.value;
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

  visualizer(x: string):void{
    sessionStorage.setItem("animal-id", x)
    this.router.navigate(['/animal-visualizer'])
  }
}

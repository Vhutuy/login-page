import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Animal, AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  userName: string | null = '';
  pets: Animal[] = [];
  filteredPets: Animal[] = [];
  currentPage = 1;
  pageSize = 6;
  especies: string[] = ['Cachorro', 'Gato', 'Coelho', 'Aves', 'Equinos'];
  racas: string[] = ['Labrador', 'Poodle', 'Bulldog', 'Chihuahua', 'Beagle'];
  cores: string[] = ['Preto', 'Branco', 'Amarelo', 'Laranja', 'Cinza'];
  maxPages: number = 1;

  // Filtros selecionados
  selectedEspecie: string = '';
  selectedRaca: string = '';
  selectedCor: string = '';
  selectedTamanho: string = '';
  selectedSexo: string = '';
  selectedIdadeInicio: string = '';
  selectedIdadeFim: string = '';

  constructor(@Inject(AnimalService) private animalService: AnimalService) {
    this.userName = sessionStorage.getItem('userName');
  }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.animalService.getAnimais().subscribe(
      (data) => {
        this.pets = data;
        this.filteredPets = data;
        this.maxPages = Math.ceil(this.pets.length / this.pageSize);
      },
      (error) => {
        console.error('Erro ao carregar os animais:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredPets = this.pets.filter(pet => {
      return (
        (this.selectedEspecie ? pet.especie === this.selectedEspecie : true) &&
        (this.selectedRaca ? pet.raca === this.selectedRaca : true) &&
        (this.selectedCor ? pet.cor === this.selectedCor : true) &&
        (this.selectedTamanho ? pet.tamanho === this.selectedTamanho : true) &&
        (this.selectedSexo ? pet.sexo === this.selectedSexo : true) &&
        (this.selectedIdadeInicio ? pet.idade >= parseInt(this.selectedIdadeInicio) : true) &&
        (this.selectedIdadeFim ? pet.idade <= parseInt(this.selectedIdadeFim) : true)
      );
    });
    this.maxPages = Math.ceil(this.filteredPets.length / this.pageSize);
    this.currentPage = 1;
  }

  get paginatedPets(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredPets.slice(startIndex, endIndex);
  }

  changePage(delta: number): void {
    const totalPages = Math.ceil(this.filteredPets.length / this.pageSize);
    this.currentPage = Math.min(Math.max(this.currentPage + delta, 1), totalPages);
  }

  clearVerticalFilters(): void {
    this.selectedTamanho = '';
    this.selectedSexo = '';
    this.selectedIdadeInicio = '';
    this.selectedIdadeFim = '';
  }
}

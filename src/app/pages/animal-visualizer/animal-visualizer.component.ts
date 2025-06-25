import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-animal-visualizer',
  templateUrl: './animal-visualizer.component.html',
  styleUrls: ['./animal-visualizer.component.scss'],
  standalone: true,
  imports: [CommonModule, NavBarComponent]
})
export class AnimalVisualizerComponent implements OnInit {
  animal: any = null;
  erro: string | null = null;
  imagePreview: any;

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    const id = sessionStorage.getItem('animal-id');
    if (!id) {
      this.erro = 'ID do animal não encontrado.';
      return;
    }

    this.animalService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.animal = dados;
      },
      error: (err) => {
        this.erro = 'Erro ao buscar dados do animal.';
        console.error(err);
      }
    });
  }
}

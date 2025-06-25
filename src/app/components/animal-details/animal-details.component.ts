import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-animal-details',
  standalone: true,
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent]
})
export class AnimalDetailsComponent implements OnInit {
  animalForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private animalService: AnimalService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalService.buscarPorId(id).subscribe(animal => {
        this.animalForm = this.fb.group({
          nome: [{ value: animal.nome, disabled: true }, Validators.required],
          especie: [{ value: animal.especie, disabled: true }, Validators.required],
          raca: [{ value: animal.raca, disabled: true }],
          sexo: [{ value: animal.sexo, disabled: true }, Validators.required],
          tamanho: [{ value: animal.tamanho, disabled: true }, Validators.required],
          cor: [{ value: animal.cor, disabled: true }, Validators.required],
          idade: [{ value: animal.idade, disabled: true }, [Validators.required, Validators.min(0)]],
          descricao: [{ value: animal.descricao, disabled: true }]
        });



        this.imagePreview = 'data:image/jpeg;base64,' + animal.imagemBase64;
      });
    }
  }
}

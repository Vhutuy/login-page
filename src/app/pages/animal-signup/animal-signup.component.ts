import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-animal-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavBarComponent],
  templateUrl: './animal-signup.component.html',
  styleUrls: ['./animal-signup.component.scss']
})
export class AnimalSignupComponent {
  onImageSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
  animalForm: FormGroup;
  showRacas: boolean = false;
  imagePreview: any;

  constructor(private fb: FormBuilder, private animalService: AnimalService) {
    this.animalForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: [''],
      sexo: ['', Validators.required],
      tamanho: ['', Validators.required],
      cor: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]],
      descricao: ['']
    });

    this.animalForm.get('especie')?.valueChanges.subscribe((value) => {
      this.updateRacaVisibility(value);
    });
  }

  updateRacaVisibility(especie: string) {
    this.showRacas = especie === 'CACHORRO';

    if (!this.showRacas) {
      this.animalForm.get('raca')?.setValue('');
      this.animalForm.get('raca')?.clearValidators();
    } else {
      this.animalForm.get('raca')?.setValidators([Validators.required]);
    }

    this.animalForm.get('raca')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.animalForm.valid) {
      const userId = '773620a1-2366-4061-b1bd-894a6517f533';
      if (!userId) {
        alert('Usuário não autenticado!');
        return;
      }

      const animalData = {
        ...this.animalForm.value,
        userId: userId
      };

      if (animalData.especie !== 'CACHORRO') {
        delete animalData.raca;
      }

      this.animalService.cadastrarAnimalJson(animalData).subscribe({
        next: () => alert('Animal cadastrado com sucesso!'),
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar: ' + (err?.error?.message || 'Erro desconhecido'));
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }

}

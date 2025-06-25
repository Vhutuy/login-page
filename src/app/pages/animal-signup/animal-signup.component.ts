import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  animalForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  showRacas: boolean = false;

  constructor(private fb: FormBuilder, private animalService: AnimalService) {
    this.animalForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: [''],
      sexo: ['', Validators.required],
      tamanho: ['', Validators.required],
      cor: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]],
      descricao: [''],
      imagem: [null]
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

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.animalForm.valid) {
      const formData = new FormData();

      const userId = '773620a1-2366-4061-b1bd-894a6517f533';
      if (!userId) {
        alert('Usuário não autenticado');
        return;
      }

      // Preenche o formData com os dados do formulário
      Object.entries(this.animalForm.value).forEach(([key, value]) => {
        if (key !== 'imagem') {
          formData.append(key, value?.toString() ?? '');
        }
      });

      formData.append('userId', userId);

      // Apenas para debugar
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      // Faz o cadastro
      this.animalService.cadastrarAnimal(formData).subscribe({
        next: () => alert('Animal cadastrado com sucesso!'),
        error: (err: any) => {
          console.error(err);
          alert('Erro ao cadastrar: ' + (err?.error?.message || 'Erro desconhecido'));
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }



}

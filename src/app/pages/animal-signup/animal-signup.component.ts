import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-animal-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './animal-signup.component.html',
  styleUrl: './animal-signup.component.scss'
})
export class AnimalSignupComponent {
  animalForm: FormGroup;
  selectedFile: File | null = null;
  showRacas: boolean = false;

  constructor(private fb: FormBuilder, private animalService: AnimalService) {
    this.animalForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: [''], // Validação condicional
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.animalForm.valid) {
      const formData = new FormData();
      const userId = '0c080a7f-e74d-4d24-9c84-d36f751f968d'; // UUID fixo

      for (const [key, value] of Object.entries(this.animalForm.value)) {
        if (key !== 'imagem') {
          formData.append(key, value?.toString() ?? '');
        }
      }

      if (this.selectedFile) {
        formData.append('imagem', this.selectedFile, this.selectedFile.name);
      }

      formData.append('userId', userId);

      this.animalService.cadastrarAnimal(formData).subscribe({
        next: () => alert('Animal cadastrado com sucesso!'),
        error: (err: any) =>
          alert('Erro ao cadastrar: ' + (err?.error?.message || 'Erro desconhecido'))
      });
    } else {
      alert('Preencha todos os campos obrigatórios!');
    }
  }
}

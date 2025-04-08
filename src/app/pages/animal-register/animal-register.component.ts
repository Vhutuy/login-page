import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { DeafultLoginLayoutComponent } from '../../components/deafult-login-layout/deafult-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { AnimalService } from '../../services/animal.service';
// import { AnimalService } from '../../services/animal.service';

interface AnimalForm {
  nome: FormControl<string>;
  cor: FormControl<string>;
  descricao: FormControl<string>;
  especie: FormControl<string>;
  idade: FormControl<number>;
  raca: FormControl<string>;
  sexo: FormControl<string>;
  tamanho: FormControl<string>;
}

@Component({
  selector: 'app-animal-register',
  standalone: true,
  imports: [
    DeafultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [],
  templateUrl: './animal-register.component.html',
  styleUrl: './animal-register.component.scss',
})
export class AnimalRegisterComponent {
  animalForm!: FormGroup<AnimalForm>;

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private toastService: ToastrService
  ) {
    this.animalForm = new FormGroup({
      nome: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cor: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      descricao: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      especie: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      idade: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      raca: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sexo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      tamanho: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
  /*
  submit() {
    if (this.animalForm.valid) {
      this.animalService.registerAnimal(this.animalForm.value).subscribe({
        next: () => {
          this.toastService.success('Animal registrado com sucesso!');
          this.router.navigate(['/animais']);
        },
        error: () => {
          this.toastService.error('Erro ao registrar animal. Tente novamente.');
        },
      });
    }
    
  }
  */

  navigate() {
    this.router.navigate(['/animais']);
  }

  registerAnimal(animal: any) {
    // só pra rodar
    return of(null);
  }
}

import { Component } from '@angular/core';
import { DeafultLoginLayoutComponent } from '../../components/deafult-login-layout/deafult-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DeafultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;
  
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
  const { email, password } = this.loginForm.value;

  this.loginService.login(email!, password!).subscribe({
    next: (user: any) => {

      sessionStorage.setItem('userName', user.name);

      this.toastService.success("Login feito com sucesso!");
      this.router.navigate(["home"]);
    },
    error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
  });
}


  navigate(){
    this.router.navigate(["signup"])
  }
}



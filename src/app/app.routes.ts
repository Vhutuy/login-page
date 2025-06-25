import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { Component } from '@angular/core';
import { AnimalSignupComponent } from './pages/animal-signup/animal-signup.component';
import { AnimalVisualizerComponent } from './pages/animal-visualizer/animal-visualizer.component';


export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "animal-signup",
        component: AnimalSignupComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "animal-visualizer",
        component: AnimalVisualizerComponent,
        canActivate:[AuthGuard]
    }

];



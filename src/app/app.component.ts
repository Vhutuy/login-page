import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalSignupComponent } from "./pages/animal-signup/animal-signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'login-page';
}

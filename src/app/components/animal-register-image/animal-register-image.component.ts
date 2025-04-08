import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-animal-register-image',
  standalone: true,
  templateUrl: './animal-register-image.component.html',
  styleUrls: ['./animal-register-image.component.scss'],
})
export class AnimalRegisterImageComponent {
  @Input() disablePrimaryBtn: boolean = false;
}

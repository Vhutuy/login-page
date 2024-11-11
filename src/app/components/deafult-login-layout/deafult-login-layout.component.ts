import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deafult-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './deafult-login-layout.component.html',
  styleUrl: './deafult-login-layout.component.scss'
})
export class DeafultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
}

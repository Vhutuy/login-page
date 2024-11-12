import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  
  @Output("navigate") OnNavigate = new EventEmitter();

  submit(){
    this.onSubmit.emit()
  }

  navigate(){
    this.OnNavigate.emit()
  }
}

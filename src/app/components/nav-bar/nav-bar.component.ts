import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  userName: string | null = null;
  dropdownAberto = false;

  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName');
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownAberto = !this.dropdownAberto;
  }

  @HostListener('document:click', ['$event'])
  fecharDropdownSeClicarFora(event: MouseEvent): void {
    const alvo = event.target as HTMLElement;

    const clicouNoToggle = this.dropdownToggle?.nativeElement.contains(alvo);
    if (!clicouNoToggle) {
      this.dropdownAberto = false;
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.userName = null;
    this.dropdownAberto = false;
    this.router.navigate(['/login']);
  }
}

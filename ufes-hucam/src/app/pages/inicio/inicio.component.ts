import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-inicio',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  title = 'ufes-hucam';

  show = false;

  constructor(private router: Router) { }

  sobre() {
    this.router.navigate(['sobre']);

  }

  toggleModal(v:boolean){
    this.show = v;
  }
}

/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, input, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input () title!: string;
  // recibe la ruta a la que queremos volver 
  @Input() backButton!: string;



  constructor() { }

  ngOnInit() {}

}

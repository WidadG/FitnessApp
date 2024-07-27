/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input,   OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {
  @Input() control!: FormControl;
  @Input() type!: String;
  @Input() label!: String;
  @Input() autocomplete!: String;
  @Input() icon!: String;

  isPassword!: Boolean;
  hide: Boolean= true;


  constructor() { }

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true;
  }

  showOrHidePassword() {

    this.hide = !this.hide;

    if (this.hide) this.type ="password";
    else this.type= "text";
  }
}



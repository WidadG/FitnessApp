import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  cycleDay: number = 11; // Día del ciclo
  cyclePhase: string = 'Ovulación'; // Fase del ciclo
  calorias: number = 350; // Calorías quemadas
  series: number = 5; // Series completadas
  fuerza: number = 15; // Fuerza ganada en porcentaje
  consejos: string = 'Mantente hidratada y descansa bien.'; // Consejos del día


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  // cerrar sesion 
  singOut(){
    this.firebaseSvc.signOut();
  }

}

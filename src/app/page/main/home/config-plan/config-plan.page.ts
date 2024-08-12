import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-plan',
  templateUrl: './config-plan.page.html',
  styleUrls: ['./config-plan.page.scss'],
})
export class ConfigPlanPage implements OnInit {
  personalData = {
    name: '',
    age: null,
    weight: null,
    fitnessLevel: '',
    goals: '',
    inicioCiclo: ''
  };

  faseMenstrual: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.calcularFaseMenstrual();
  }
  

  async savePersonalData() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    if (userId) {
      this.firebaseService.setDocument(`users/${userId}`, this.personalData).then(() => {
        console.log('Los datos se han subido exitosamente');
        //Falta llamar a la funcion
      }).catch((error) => {
        console.error('Error al subir los datos: ', error);
      });
    } else {
      console.error('El usuario no esta logeado');
    }
  }

  calcularFaseMenstrual() {
    if (this.personalData.inicioCiclo) {
      const inicioCiclo = new Date(this.personalData.inicioCiclo);
      const today = new Date();
      const dayDifference = Math.floor((today.getTime() - inicioCiclo.getTime()) / (1000 * 60 * 60 * 24));
      const cycleDay = dayDifference % 28;

      if (cycleDay >= 0 && cycleDay <= 5) {
        this.faseMenstrual = 'Fase Folicular A - Menstruación';
      } else if (cycleDay > 5 && cycleDay <= 14) {
        this.faseMenstrual = 'Fase Folicular B - Post Menstruación';
      } else if (cycleDay > 14 && cycleDay <= 17) {
        this.faseMenstrual = 'Fase Ovulación';
      } else if (cycleDay > 17 && cycleDay <= 28) {
        this.faseMenstrual = 'Fase Lútea';
      } else {
        this.faseMenstrual = 'Fase desconocida';
      }
    } else {
      this.faseMenstrual = 'Fecha de inicio del periodo no seleccionada';
    }
  }
  
}


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
    inicioCiclo: '',
    faseMenstrual: '',
    diasEntrenamiento: 3 // Valor predeterminado de 3 días
  };

  faseMenstrual: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.loadPersonaData(); //Carga los datos ingresados por el usuario anteriormente
    this.calcularFaseMenstrual(); // Cálculo inicial de la fase menstrual
  }
  
  async loadPersonaData() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    console.log('userId:', userId); // Verificar si el userId es correcto
    
    if (userId) {
      this.firebaseService.getDocument(`users/${userId}`).then((data) => {
        console.log('Data:', data); // Verifica si los datos son correctos
  
        if (data) { // Verifica si los datos no son null o undefined
          this.personalData = data as any;
          this.calcularFaseMenstrual();
        } else {
          console.log("No se encontraron datos para el usuario."); // Si no se encuentran datos
        }
      }).catch((error) => {
        console.error("Error al cargar los datos:", error); // Captura errores al recuperar datos
      });
    } else {
      console.error("El usuario no está logueado."); // Verificar si el usuario está logueado
    }
  }
  

  async savePersonalData() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    if (userId) {
      // Recalcular la fase menstrual antes de guardar los datos
      this.calcularFaseMenstrual();
  
      // Añadir la fase menstrual a los datos del usuario
      this.personalData.faseMenstrual = this.faseMenstrual;
  
      this.firebaseService.setDocument(`users/${userId}`, this.personalData).then(() => {
        console.log('Los datos se han subido exitosamente');
        this.router.navigate(['./entrenamiento'], { queryParams: { fase: this.faseMenstrual } });
      }).catch((error) => {
        console.error('Error al subir los datos:', error);
      });
    } else {
      console.error('El usuario no está logueado');
    }
  }

  calcularFaseMenstrual() {
    if (this.personalData.inicioCiclo) {
      const inicioCiclo = new Date(this.personalData.inicioCiclo);
      const today = new Date();
      const dayDifference = Math.floor((today.getTime() - inicioCiclo.getTime()) / (1000 * 60 * 60 * 24));
      const cycleDay = dayDifference % 28;
  
      if (cycleDay >= 0 && cycleDay <= 5) {
        this.faseMenstrual = 'Fase Folicular A – Menstruación';
      } else if (cycleDay > 5 && cycleDay <= 14) {
        this.faseMenstrual = 'Fase Folicular B – Post Menstruación';
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
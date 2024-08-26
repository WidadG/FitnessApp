import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor() {}

  getEntrenamientoPorFase(faseMenstrual: string): any {
    switch (faseMenstrual) {
      case 'Fase Folicular A - Menstruación':
        return this.getEntrenamientoMenstruacion();
      case 'Fase Folicular B - Post Menstruación':
        return this.getEntrenamientoPostMenstruacion();
      case 'Fase Ovulación':
        return this.getEntrenamientoOvulacion();
      case 'Fase Lútea':
        return this.getEntrenamientoLutea();
      default:
        return this.getEntrenamientoGeneral();
    }
  }

  getEntrenamientoMenstruacion() {
    return {
      nombre: 'Entrenamiento Suave',
      ejercicios: ['Hombros'],
    };
  }

  getEntrenamientoPostMenstruacion() {
    return {
      nombre: 'Entrenamiento Piernas',
      ejercicios: ['Piernas, Gluteos', ],
    };
  }

  getEntrenamientoOvulacion() {
    return {
      nombre: 'Entrenamiento Intensivo',
      ejercicios: ['Core, Lumbares'],
    };
  }

  getEntrenamientoLutea() {
    return {
      nombre: 'Entrenamiento de Recuperación',
      ejercicios: ['Triceps'],
    };
  }

  getEntrenamientoGeneral() {
    return {
      nombre: 'Entrenamiento General',
      ejercicios: ['Pectorales'],
    };
  }
}

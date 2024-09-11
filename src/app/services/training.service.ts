import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VideoService } from './video.servise';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Video } from './video.servise';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private videoService: VideoService, private firestore: AngularFirestore) {}

  // // Métodos para obtener entrenamiento por fase menstrual
  // getEntrenamientoPorFase(faseMenstrual: string): any {
  //   switch (faseMenstrual) {
  //     case 'Fase Folicular A - Menstruación':
  //       return this.getEntrenamientoMenstruacion();
  //     case 'Fase Folicular B - Post Menstruación':
  //       return this.getEntrenamientoPostMenstruacion();
  //     case 'Fase Ovulación':
  //       return this.getEntrenamientoOvulacion();
  //     case 'Fase Lútea':
  //       return this.getEntrenamientoLutea();
  //     default:
  //       return this.getEntrenamientoGeneral();
  //   }
  // }

  // getEntrenamientoMenstruacion() {
  //   return {
  //     nombre: 'Entrenamiento Suave',
  //     ejercicios: ['Hombros'],
  //   };
  // }

  // getEntrenamientoPostMenstruacion() {
  //   return {
  //     nombre: 'Entrenamiento Piernas',
  //     ejercicios: ['Piernas, Gluteos', ],
  //   };
  // }

  // getEntrenamientoOvulacion() {
  //   return {
  //     nombre: 'Entrenamiento Intensivo',
  //     ejercicios: ['Core, Lumbares'],
  //   };
  // }

  // getEntrenamientoLutea() {
  //   return {
  //     nombre: 'Entrenamiento de Recuperación',
  //     ejercicios: ['Triceps'],
  //   };
  // }

  // getEntrenamientoGeneral() {
  //   return {
  //     nombre: 'Entrenamiento General',
  //     ejercicios: ['Pectorales'],
  //   };
  // }

    // Este método construye la rutina según el modo de entrenamiento, los días y la fase menstrual
  
  getRoutine(modoEntrenamiento: string, diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
    switch (modoEntrenamiento) {
      case 'modoCuerpoCompleto':
        return this.getCuerpoCompletoRoutine(diasEntrenamiento, faseMenstrual);

      case 'modoJalarEmpujarPiernas':
        return this.getJalarEmpujarPiernasRoutine(diasEntrenamiento, faseMenstrual);

      case 'modoSuperiorInferior':
        return this.getSuperiorInferiorRoutine(diasEntrenamiento, faseMenstrual);

      default:
        return this.getCuerpoCompletoRoutine(diasEntrenamiento, faseMenstrual);
    }
  }

  // Rutina para Cuerpo Completo
  private getCuerpoCompletoRoutine(diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
    return this.videoService.getVideosForCuerpoCompleto().pipe(
      map(videos => this.adjustIntensity(videos, faseMenstrual))
    );
  }

  // Rutina para Jalar, Empujar y Piernas
  private getJalarEmpujarPiernasRoutine(diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
    // Aquí distribuimos los días de entrenamiento para jalar, empujar y piernas
    let dayModulo = diasEntrenamiento % 3; // Asumiendo que son 3 días de rutina
    switch (dayModulo) {
      case 1:
        return this.videoService.getVideosByGroupAndTren('jalar', 'superior').pipe(
          map(videos => this.adjustIntensity(videos, faseMenstrual))
        );
      case 2:
        return this.videoService.getVideosByGroupAndTren('empujar', 'superior').pipe(
          map(videos => this.adjustIntensity(videos, faseMenstrual))
        );
      case 3:
        return this.videoService.getVideosByTren('inferior').pipe(
          map(videos => this.adjustIntensity(videos, faseMenstrual))
        );
      default:
        // Si por alguna razón dayModulo no es 1, 2 o 3, devolver algo por defecto
        return this.videoService.getVideosByTren('inferior').pipe(
          map(videos => this.adjustIntensity(videos, faseMenstrual))
        );
    }
  }

  // Rutina para Superior e Inferior
  private getSuperiorInferiorRoutine(diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
    // Alterna días entre superior e inferior
    return diasEntrenamiento % 2 === 0
      ? this.videoService.getVideosByTren('superior').pipe(map(videos => this.adjustIntensity(videos, faseMenstrual)))
      : this.videoService.getVideosByTren('inferior').pipe(map(videos => this.adjustIntensity(videos, faseMenstrual)));
  }

  // Ajusta la intensidad de los ejercicios según la fase menstrual
  private adjustIntensity(videos: Video[], faseMenstrual: string): Video[] {
    return videos.map(video => {
      switch (faseMenstrual) {
        case 'Fase Folicular A - Menstruación':
          video.reps = video.reps - 2; // Disminuye repeticiones en esta fase
          break;
        case 'Fase Folicular B - Post Menstruación':
          video.reps = video.reps + 2; // Aumenta repeticiones en esta fase
          break;
        case 'Fase Ovulación':
          video.kg = video.kg + 5; // Aumenta el peso en esta fase
          break;
        case 'Fase Lútea':
          video.kg = video.kg - 5; // Disminuye el peso en esta fase
          break;
      }
      return video;
    });
  }

  // Método para guardar un entrenamiento en Firebase
  guardarEntrenamiento(userId: string, entrenamiento: any) {
    return this.firestore.collection('users').doc(userId).collection('entrenamientos').add(entrenamiento);
  }

  getEntrenamientos(userId: string): Observable<any[]> {
    return this.firestore.collection(`users/${userId}/entrenamientos`).valueChanges();
    
  }
  getHistorialEntrenamientos(userId: string) {
    return this.firestore.collection('users').doc(userId).collection('entrenamientos').valueChanges();
  }
}


  

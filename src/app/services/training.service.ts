import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VideoService } from './video.servise';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Video } from './video.servise';
import { switchMap } from 'rxjs';

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

  //Filtra los ejercicios por día
  private filterExercisesByDay(videos: Video[], faseMenstrual: string, maxExercises: number): Video[] {
    const adjustedVideos = this.adjustIntensity(videos, faseMenstrual);
  
    // Limitar a un máximo de `maxExercises` por día
    return adjustedVideos.slice(0, maxExercises);
  }
  
  // Rutina para Cuerpo Completo
  private getCuerpoCompletoRoutine(diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
    return this.videoService.getVideosForCuerpoCompleto().pipe(
      map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6)) // Filtrar los ejercicios
    );
  }

  // Rutina para Jalar, Empujar y Piernas
  private getJalarEmpujarPiernasRoutine(diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
    // Aquí distribuimos los días de entrenamiento para jalar, empujar y piernas
    let dayModulo = diasEntrenamiento % 3; // Asumiendo que son 3 días de rutina
    switch (dayModulo) {
      case 1:
        return this.videoService.getVideosByGroupAndTren('jalar', 'superior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6))
        );
      case 2:
        return this.videoService.getVideosByGroupAndTren('empujar', 'superior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6))
        );
      case 3:
        return this.videoService.getVideosByTren('inferior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6))
        );
      default:
        // Si por alguna razón dayModulo no es 1, 2 o 3, devolver algo por defecto
        return this.videoService.getVideosByTren('inferior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6))
        );
    }
  }

  // Rutina para Superior e Inferior
  private getSuperiorInferiorRoutine(diasEntrenamiento: number, faseMenstrual: string): Observable<Video[]> {
  // Alterna días entre tren superior e inferior
    const dayModulo = diasEntrenamiento % 2; // Alterna los días
    switch (dayModulo) {
      case 1:
        return this.videoService.getVideosByTren('superior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6)) // Límite de 6 ejercicios
        );
      case 0:
        return this.videoService.getVideosByTren('inferior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6))
        );
      default:
        return this.videoService.getVideosByTren('inferior').pipe(
          map(videos => this.filterExercisesByDay(videos, faseMenstrual, 6))
        );
    }
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

  // Métodos para guardar un entrenamiento en Firebase y controlar los entrenamientos realizados.
  guardarEntrenamiento(userId: string, entrenamiento: any) {
    return this.firestore.collection('users').doc(userId).collection('entrenamientos').add(entrenamiento);
  }

  getEntrenamientos(userId: string): Observable<any[]> {
    return this.firestore.collection(`users/${userId}/entrenamientos`).valueChanges();
    
  }

  // Método para obtener el próximo entrenamiento basado en el estado de la semana
  getNextTraining(userId: string): Observable<Video[]> {
    return this.firestore.collection(`users/${userId}/entrenamientos`).valueChanges().pipe(
      map((entrenamientos: any[]) => {
        // Filtrar entrenamientos completados de esta semana
        const entrenamientosCompletados = entrenamientos.filter(e => e.completed);
        const siguienteDia = entrenamientosCompletados.length + 1;
  
        // Verificar si hay datos disponibles
        const modoEntrenamiento = entrenamientos[0]?.modoEntrenamiento || 'modoCuerpoCompleto';
        const diasEntrenamiento = entrenamientos[0]?.diasEntrenamiento || 3; // Valor predeterminado si no está disponible
        const faseMenstrual = entrenamientos[0]?.faseMenstrual || 'Fase Folicular B';
  
        // Obtener la rutina basada en los valores calculados
        return this.getRoutine(modoEntrenamiento, siguienteDia, faseMenstrual);
      }),
      // Como `getRoutine` devuelve un Observable, debemos aplanar ese Observable dentro del flujo de RxJS
      switchMap(routine => routine)
    );
  }

  //Metodo para obtener el historial de entrenamientos de la usuaria.
  getHistorialEntrenamientos(userId: string) {
    return this.firestore.collection('users').doc(userId).collection('entrenamientos').valueChanges();
  }

  // Método para obtener el récord de repeticiones
  getMaxReps(userId: string): Observable<number> {
    return this.firestore.collection('users').doc(userId).valueChanges().pipe(
      map((userData: any) => userData?.maxReps || 0)  // Devuelve el récord actual de repeticiones o 0 si no existe
    );
  }

  // Método para actualizar el récord de repeticiones
  updateMaxReps(userId: string, newMaxReps: number): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({
      maxReps: newMaxReps
    });
  }
}


  

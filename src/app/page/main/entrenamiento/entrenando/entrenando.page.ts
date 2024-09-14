import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService, Video, Set } from 'src/app/services/video.servise';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from 'src/app/services/training.service';





@Component({
  selector: 'app-entrenando',
  templateUrl: './entrenando.page.html',
  styleUrls: ['./entrenando.page.scss'],
})
export class EntrenandoPage implements OnInit {
  faseMenstrual: string;
  personalizedExercises: Video[] = [];
  startTime: Date;
  timer: any;
  duration: number = 0;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private videoService: VideoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.startTime = new Date();

    // Obtener los ejercicios y la fase menstrual de los parámetros
    this.route.queryParams.subscribe(params => {
      if (params['exercises']) {
        this.personalizedExercises = JSON.parse(params['exercises']);
        this.initializeSetsForExercises();  // Inicializar los sets para cada ejercicio
      }

      if (params['faseMenstrual']) {
        this.faseMenstrual = params['faseMenstrual'];
      } else {
        this.faseMenstrual = 'Fase desconocida'; 
      }
    });
  }

  addSet(ejercicio: Video) {
    // Agrega un nuevo set al ejercicio con valores por defecto.
    if (!ejercicio.sets) {
      ejercicio.sets = [];
    }
    ejercicio.sets.push({ anterior: '', kg: 0, reps: 0, completed: false });
  }

  initializeSetsForExercises() {
    this.personalizedExercises.forEach(ejercicio => {
      // Asegurar que cada ejercicio tenga la propiedad 'sets'
      if (!ejercicio.sets) {
        ejercicio.sets = [
          { anterior: '', kg: 0, reps: 0, completed: false },
          { anterior: '', kg: 0, reps: 0, completed: false },
          { anterior: '', kg: 0, reps: 0, completed: false },
        ];
      }
    });
  }

  finishTraining() {
    const endTime = new Date();
    const duration = (endTime.getTime() - this.startTime.getTime()) / 1000;  // Calculamos la duración en segundos

    // Calcular el máximo de repeticiones en el entrenamiento actual
    let maxRepsInCurrentTraining = 0;
    this.personalizedExercises.forEach(ejercicio => {
      ejercicio.sets.forEach(set => {
        if (set.reps > maxRepsInCurrentTraining) {
          maxRepsInCurrentTraining = set.reps;
        }
      });
    });
  
    // Guardar los datos del entrenamiento pero sólo los sets completados
    const entrenamiento = {
      startTime: this.startTime,
      endTime: endTime,
      duration: duration,
      faseMenstrual: this.faseMenstrual,
      ejercicios: this.personalizedExercises.map(ejercicio => ({
        nombre: ejercicio.titulo,
        sets: ejercicio.sets.filter(set => set.completed).map(set => ({
          anterior: set.anterior,
          kg: set.kg,
          reps: set.reps,
          completed: set.completed
        }))
      })).filter(ejercicio => ejercicio.sets.length > 0) // Guardar solo los ejercicios con sets completados
    };
  
    // Guardar el entrenamiento en Firebase y redirigir al historial de entrenamientos
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.trainingService.getMaxReps(user.uid).subscribe(maxRepsRecord => {
          const currentMaxReps = maxRepsRecord || 0;
  
          // Comparar y actualizar el récord si es necesario
          if (maxRepsInCurrentTraining > currentMaxReps) {
            this.trainingService.updateMaxReps(user.uid, maxRepsInCurrentTraining)
              .then(() => {
                console.log('Nuevo récord de repeticiones guardado.');
              })
              .catch(error => {
                console.error('Error al guardar el récord:', error);
              });
          }

          //Guardar el entrenamiento
          this.trainingService.guardarEntrenamiento(user.uid, entrenamiento)
            .then(() => {
              console.log('Entrenamiento guardado exitosamente.');
              this.router.navigate(['/main/entrenamiento/historial-entrenamientos']);  
            })
            .catch(error => {
              console.error('Error al guardar el entrenamiento:', error);
            });
        });
      }
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace("watch?v=", "embed/"));
  }
}

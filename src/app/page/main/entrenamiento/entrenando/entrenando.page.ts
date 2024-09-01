import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VideoService, Video } from 'src/app/services/video.servise';
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
  timer: any; // Variable para el intervalo del temporizador
  duration: number = 0; // Duración en segundos
  exercises: any[]; // Lista de ejercicios que se muestran en la página

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private videoService: VideoService

  ) {}

  ngOnInit() {
    this.startTime = new Date(); // Guardar la hora de inicio cuando se inicia la página

    // Iniciar el contador de tiempo
    this.timer = setInterval(() => {
      this.duration++; // Incrementa la duración cada segundo
    }, 1000);
    
    this.route.queryParams.subscribe(params => {
      // Aquí debes recibir los ejercicios que se pasan desde la página anterior
      if (params['exercises']) {
        this.personalizedExercises = JSON.parse(params['exercises']);
      }

      // Obtener fase menstrual desde los parámetros
      if (params['faseMenstrual']) {
        this.faseMenstrual = params['faseMenstrual'];
      } else {
        this.faseMenstrual = 'Fase desconocida'; // Valor por defecto si no se pasa el parámetro
      }
    });
  }

  finishTraining() {
    const endTime = new Date();
    const duration = (endTime.getTime() - this.startTime.getTime()) / 1000; // en segundos

    const entrenamiento = {
      startTime: this.startTime,
      endTime: endTime,
      duration: duration,
      faseMenstrual: this.faseMenstrual,
      ejercicios: this.personalizedExercises
    };

    this.afAuth.user.subscribe(user => {
      if (user) {
        this.trainingService.guardarEntrenamiento(user.uid, entrenamiento)
          .then(() => {
            console.log('Entrenamiento guardado exitosamente.');
          })
          .catch(error => {
            console.error('Error al guardar el entrenamiento:', error);
          });
      }
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace("watch?v=", "embed/"));
  }
}

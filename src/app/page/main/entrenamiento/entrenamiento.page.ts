import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService, Video } from 'src/app/services/video.servise';
import { TrainingService } from 'src/app/services/training.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.page.html',
  styleUrls: ['./entrenamiento.page.scss'],
})
export class EntrenamientoPage implements OnInit {
  faseMenstrual: string;
  musculo: string;
  personalizedExercises: Video[] = []; // Array de videos filtrados por musculo
  selectedVideo: Video | null = null;
  videoUrl: any;
  entrenamiento: any; 
  startTime: Date; // Almacenar la hora de inicio del entrenamiento

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    public sanitizer: DomSanitizer,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth // Para obtener el userId
  ) {}

  ngOnInit() {

    // Obtener la fase menstrual desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.faseMenstrual = params['fase'];
      this.entrenamiento = this.trainingService.getEntrenamientoPorFase(this.faseMenstrual);
      this.loadPersonalizedExercises();
    });
  }

  loadPersonalizedExercises() {
    this.videoService.getVideos().subscribe((videos) => {
      // Filtra los videos basados en los ejercicios devueltos por el TrainingService
      this.personalizedExercises = videos.filter(video =>
        this.entrenamiento.ejercicios.includes(video.musculo)
      );
    });
  }

  startTraining() {
    // Redirigir a la página de "Entrenando" y pasar los ejercicios
    this.router.navigate(['/main/entrenamiento/entrenando'], {
      queryParams: {
        exercises: JSON.stringify(this.personalizedExercises)
      }
    });
  }

  //finishTraining() {
  //  const endTime = new Date();
  //  const duration = (endTime.getTime() - this.startTime.getTime()) / 1000; // en segundos

  //  const entrenamiento = {
  //    startTime: this.startTime,
  //    endTime: endTime,
  //    duration: duration,
  //    faseMenstrual: this.faseMenstrual,
  //    ejercicios: this.personalizedExercises
  //  };

  //  this.afAuth.user.subscribe(user => {
  //    if (user) {
  //      this.trainingService.guardarEntrenamiento(user.uid, entrenamiento)
  //        .then(() => {
  //          console.log('Entrenamiento guardado exitosamente.');
  //        })
  //        .catch(error => {
  //          console.error('Error al guardar el entrenamiento:', error);
  //        });
  //    }
  //  });
  //}
  
  playVideo(video: Video) {
    this.selectedVideo = video;  
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url.replace("watch?v=", "embed/"));
  }
}

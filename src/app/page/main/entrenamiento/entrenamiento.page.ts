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
  modoEntrenamiento: string;
  diasEntrenamiento: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    public sanitizer: DomSanitizer,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth // Para obtener el userId
  ) {}

  ngOnInit() {

  //   // Obtener la fase menstrual desde los parámetros de la URL
  //   this.route.queryParams.subscribe(params => {
  //     this.faseMenstrual = params['fase'];
  //     this.entrenamiento = this.trainingService.getEntrenamientoPorFase(this.faseMenstrual);
  //     this.loadPersonalizedExercises();
  //   });
  // }

  // //Funcion que genera entrenamiento
  // loadPersonalizedExercises() {
  //   this.videoService.getVideos().subscribe((videos) => {
  //     // Filtra los videos basados en los ejercicios devueltos por el TrainingService
  //     this.personalizedExercises = videos.filter(video =>
  //       this.entrenamiento.ejercicios.includes(video.musculo)
  //     );
  //   });
  // }

  // Obtener los parámetros de la URL, como la fase menstrual, modo de entrenamiento y días de entrenamiento
  this.route.queryParams.subscribe(params => {
    this.faseMenstrual = params['fase'];
    this.modoEntrenamiento = params['modoEntrenamiento'];
    this.diasEntrenamiento = params['diasEntrenamiento'];
    // Obtener los parámetros de la URL, como la fase menstrual, modo de entrenamiento y días de entrenamiento
    // Generar la rutina personalizada
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.trainingService.getNextTraining(user.uid).subscribe(exercises => {
          this.personalizedExercises = exercises;
        });
      }
    });
  });
}  

  startTraining() {
    // Redirigir a la página de "Entrenando" y pasar los ejercicios
    this.router.navigate(['/main/entrenamiento/entrenando'], {
      queryParams: {
        exercises: JSON.stringify(this.personalizedExercises),
        faseMenstrual: this.faseMenstrual
      }
    });
  }

  playVideo(video: Video) {
    this.selectedVideo = video;  
  
    // Validar que la URL proviene de YouTube
    if (video.url.startsWith("https://www.youtube.com") || video.url.startsWith("https://youtu.be")) {
      // Solo si la URL es válida, se permite la conversión y sanitización
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url.replace("watch?v=", "embed/"));
    } else {
      // Si la URL no es segura, puedes manejar el error o mostrar un mensaje
      console.error("URL no segura:", video.url);
      this.videoUrl = '';  // Asignar un valor vacío o un mensaje de error
    }
  }
}

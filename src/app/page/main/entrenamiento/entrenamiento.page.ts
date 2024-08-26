import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService, Video } from 'src/app/services/video.servise';
import { TrainingService } from 'src/app/services/training.service'; // Importa el TrainingService



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
  entrenamiento: any; // Variable para almacenar el entrenamiento devuelto por el TrainingService
  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    public sanitizer: DomSanitizer,
    private trainingService: TrainingService, // Inyecta el TrainingService
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
        console.log(videos); // Ver datos en la consola

        // Filtra los videos basados en los ejercicios devueltos por el TrainingService
        this.personalizedExercises = videos.filter(video =>
            this.entrenamiento.ejercicios.includes(video.musculo)
        );

        console.log(this.personalizedExercises); // Verifica los ejercicios filtrados
    });
  }



  toggleDetails(exercise: Video) {
    exercise.desplegarVideo = !exercise.desplegarVideo;
  }
  playVideo(video: Video) {
    this.selectedVideo = video;  // Guarda el video seleccionado
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url.replace("watch?v=", "embed/"));}
}

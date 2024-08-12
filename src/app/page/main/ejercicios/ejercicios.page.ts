import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService, Video } from 'src/app/services/video.servise';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  musculo: string;
  exercises: Video[] = []; //Un array de objetos Video que almacenará los ejercicios filtrados por el grupo muscular.

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.musculo = this.route.snapshot.paramMap.get('musculo');
    this.videoService.getVideos().subscribe((videos) => {
      console.log(videos); // Añade esto para ver los datos en la consola
      this.exercises = videos.filter(video => video.musculo === this.musculo);
      console.log(this.exercises); // Verifica los ejercicios filtrados
    });
  }

  toggleDetails(exercise: Video) {
    exercise.desplegarVideo = !exercise.desplegarVideo;
  }
}


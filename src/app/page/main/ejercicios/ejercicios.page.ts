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
    this.videoService.getVideosMusculos(this.musculo).subscribe((videos) => { //consulta a firebase directamente con un filtro
      this.exercises = videos;
      console.log(this.exercises); // Verifica los ejercicios filtrados
    });
  }

  toggleDetails(exercise: Video) {
    exercise.desplegarVideo = !exercise.desplegarVideo;
  }
}


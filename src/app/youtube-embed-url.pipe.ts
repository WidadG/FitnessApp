import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeEmbedUrl'
})
export class YoutubeEmbedUrlPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    
    // Extraer el ID del video de la URL
    const videoId = value.split('v=')[1];
    if (!videoId) {
      return '';
    }

    // Verificar si la URL tiene parámetros adicionales
    const ampersandPosition = videoId.indexOf('&');
    const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;

    // Retornar la URL de YouTube embebida
    return `https://www.youtube.com/embed/${cleanVideoId}`;
  }
}

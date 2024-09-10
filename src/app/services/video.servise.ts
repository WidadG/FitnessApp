import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

export interface Video {
  id?: string;             // ID del video
  titulo: string;          // Título del video
  url: string;             // URL del video
  descripcion?: string;    // Descripción del video
  musculo: string;         // Músculo que trabaja el video
  thumbnail?: string;      // URL de la imagen en miniatura
  grupo?: string;          // Grupo (opcional)
  tren?: string;           // Tren (opcional)
  series?: number;         // Número de series (opcional)
  reps?: number;           // Número de repeticiones (opcional)
  sets?: Set[];            // Sets realizados en el ejercicio (opcional)
  desplegarVideo?: boolean; // Estado para desplegar o no el video (opcional)
}

export interface Set {
  anterior: string;
  kg: number;
  reps: number;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class VideoService {
  private collectionName = 'videoEjercicio'; // Nombre de la colección en Firebase

  constructor(private firestore: AngularFirestore) { }

    // Obtener todos los videos
  getVideos(): Observable<Video[]> {
    return this.firestore.collection<Video>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Añadir un nuevo video a la colección
  addVideo(video: Video): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ ...video, id });
  }

  // Eliminar un video por su ID
  deleteVideo(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }

  // Actualizar un video por su ID
  updateVideo(id: string, video: Video): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(video);
  }

  
}

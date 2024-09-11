import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

export interface Video {
  id?: string;
  titulo: string;
  url: string;
  descripcion?: string;
  musculo: string;
  desplegarVideo?: boolean;
  thumbnail?: string;
  series: number;
  reps: number;
  sets?: Set[];
  tren?: string;
  grupo?: string;
  kg?: number;
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
  private collectionName = 'videoEjercicio';

  constructor(private firestore: AngularFirestore) { }

  getVideos(): Observable<Video[]> {
    return this.firestore.collection<Video>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Obtener ejercicios por grupo y tren para el modo Jalar, Empujar y Piernas
  getVideosByGroupAndTren(group: string, tren: string): Observable<Video[]> {
    return this.firestore.collection<Video>(this.collectionName, ref =>
      ref.where('grupo', '==', group).where('tren', '==', tren)
    ).valueChanges();
  }

  // Obtener ejercicios para cuerpo completo
  getVideosForCuerpoCompleto(): Observable<Video[]> {
    return this.firestore.collection<Video>(this.collectionName, ref =>
      ref.where('tren', 'in', ['superior', 'inferior'])
    ).valueChanges();
  }

  // Obtener ejercicios por tren para el modo superior/inferior
  getVideosByTren(tren: string): Observable<Video[]> {
    return this.firestore.collection<Video>(this.collectionName, ref =>
      ref.where('tren', '==', tren)
    ).valueChanges();
  }

  addVideo(video: Video): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ ...video, id });
  }

  deleteVideo(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }

  updateVideo(id: string, video: Video): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(video);
  }

  
}

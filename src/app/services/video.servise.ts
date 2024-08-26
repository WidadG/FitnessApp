import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

export interface Video {
  id?: string;
  titulo: string;
  url: string;
  descripcion?: string;
  musculo: string;
  desplegarVideo?: boolean;
  thumbnail?: string;
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

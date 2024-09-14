import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  selectedFile: File | null = null; // Para almacenar la imagen seleccionada

  constructor(private firebaseService: FirebaseService, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    if (userId) {
      this.firebaseService.getDocument(`users/${userId}`).then((data) => {
        this.user = data;
        this.user.displayName = getAuth().currentUser?.displayName || 'Usuario'; // Asegurarse de que se cargue el nombre
      });
    }
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadProfileImage();  // Subir automáticamente después de la selección
    }
  }

  // Método para activar la selección de archivo
  triggerFileInput() {
    const fileInput: HTMLElement = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  // Método para subir la imagen seleccionada
  async uploadProfileImage() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    if (this.selectedFile && userId) {
      const downloadURL = await this.firebaseService.uploadProfileImage(this.selectedFile, userId);
      this.user.profileImage = downloadURL; // Guardar la URL en el perfil del usuario
      // Actualizar el documento del usuario con la URL de la imagen
      this.firebaseService.setDocument(`users/${userId}`, this.user);
    }
  }

  signOut() {
    this.firebaseService.signOut();
  }
}


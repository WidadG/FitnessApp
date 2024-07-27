import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};

  constructor(private firebaseService: FirebaseService, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    if (userId) {
      this.firebaseService.getDocument(`users/${userId}`).then((data) => {
        this.user = data;
      });
    }
  }

  signOut() {
    this.firebaseService.signOut();
  }
}


import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-plan',
  templateUrl: './config-plan.page.html',
  styleUrls: ['./config-plan.page.scss'],
})
export class ConfigPlanPage implements OnInit {
  personalData = {
    name: '',
    age: null,
    weight: null,
    fitnessLevel: '',
    goals: ''
  };

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {}

  async savePersonalData() {
    const userId = (await this.firebaseService.getAuth().currentUser)?.uid;
    if (userId) {
      await this.firebaseService.setDocument(`users/${userId}/personalData`, this.personalData);
      this.router.navigate(['/main/home']);
    }
  }
}


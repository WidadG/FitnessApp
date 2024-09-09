import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-historial-entrenamientos',
  templateUrl: './historial-entrenamientos.page.html',
  styleUrls: ['./historial-entrenamientos.page.scss'],
})
export class HistorialEntrenamientosPage implements OnInit {
  entrenamientos: any[] = [];

  constructor(private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.trainingService.getEntrenamientos(user.uid).subscribe((entrenamientos) => {
          this.entrenamientos = entrenamientos;
        });
      }
    });
  }
}

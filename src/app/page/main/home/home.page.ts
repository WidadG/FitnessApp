import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  cycleDay: number = 0; // Se prestablece 0, se calcula más adelante
  cyclePhase: string = ''; // Fase del ciclo (se cargará desde Firebase)
  calorias: number = 350; // Calorías quemadas (ejemplo estático)
  series: number = 5; // Series completadas (ejemplo estático)
  fuerza: number = 15; // Fuerza ganada en porcentaje (ejemplo estático)
  consejos: string = 'Cargando...'; // Consejos del día (se actualizará)

  ngOnInit() {
    this.loadFaseMenstrual(); // Cargar la fase menstrual al iniciar la página
  }

  async loadFaseMenstrual() {
    const userId = (await this.firebaseSvc.getAuth().currentUser)?.uid;
    if (userId) {
      this.firebaseSvc.getDocument(`users/${userId}`).then((data) => {
        if (data && data['faseMenstrual']) {
          this.cyclePhase = data['faseMenstrual'];
          this.loadConsejos(this.cyclePhase);
        } else {
          console.log("No se encontraron datos de la fase menstrual.");
        }
      }).catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
    } else {
      console.error("El usuario no está logueado.");
    }
  }

  calculateCycleDay(inicioCiclo: string): number {
    const inicioDate = new Date(inicioCiclo);
    const today = new Date();
  
    // Asegúrate de que estamos comparando solo las fechas sin tiempo
    inicioDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    const timeDiff = today.getTime() - inicioDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
    // Si el día calculado es negativo, significa que la fecha de inicio es futura o hoy
    if (dayDiff < 0) {
      return 0;
    }
  
    // Usar módulo para ajustar dentro de un ciclo de 28 días
    return (dayDiff % 28) + 1; // Sumar 1 para que no empiece desde 0
  }

  async loadConsejos(fase: string) {
    const consejoDoc = await this.firebaseSvc.getConsejoByFase(fase);
    if (consejoDoc) {
      this.consejos = (consejoDoc as { consejo: string }).consejo;
    } else {
      this.consejos = 'No se encontró un consejo para esta fase.';
    }
  }
}


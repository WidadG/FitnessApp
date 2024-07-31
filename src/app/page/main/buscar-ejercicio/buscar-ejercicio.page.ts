import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-ejercicio',
  templateUrl: './buscar-ejercicio.page.html',
  styleUrls: ['./buscar-ejercicio.page.scss'],
})
export class BuscarEjercicioPage implements OnInit {

  searchQuery: string = '';
  musculos: any[] = [
    { name: 'Pectorales', image: 'imagenes/pectorales.png'},
    { name: 'Espalda', image: 'imagenes/espalda.png'},
    { name: 'Hombros', image: 'imagenes/hombros.png'},
    { name: 'Bíceps', image: 'imagenes/biceps.png'},
    { name: 'Tríceps', image: 'imagenes/triceps.png' },
    { name: 'Cuádriceps', image: 'imagenes/cuadriceps.png'},
    { name: 'Isquiotibiales', image: 'imagenes/isquiotibiales.png'},
    { name: 'Glúteos', image: 'imagenes/gluteos.png'},
    { name: 'Abdominales', image: 'imagenes/abdominales.png'},
    { name: 'Lumbar', image: 'imagenes/lumbares.png'},

  ];
  filtroMusculo: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filtroMusculo = this.musculos;
  }

  filterExercises() {
    this.filtroMusculo = this.musculos.filter(muscle =>
      muscle.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goToExercises(nombreMusculo: string) {
    this.router.navigate(['/main/ejercicios', nombreMusculo]);
  }
}

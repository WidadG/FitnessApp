import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-ejercicio',
  templateUrl: './buscar-ejercicio.page.html',
  styleUrls: ['./buscar-ejercicio.page.scss'],
})
export class BuscarEjercicioPage implements OnInit {

  searchQuery: string = '';
  musculos: any[] = [ //array de musculos
    { name: 'Pectorales', image: 'assets/imagenes/pectorales.png'}, //ingresado 3
    { name: 'Espalda', image: 'imagenes/espalda.png'}, //ingresdo 3
    { name: 'Hombros', image: 'imagenes/hombros.png'}, //ingresado 3
    { name: 'Biceps', image: 'imagenes/biceps.png'}, //ingresado 3
    { name: 'Tríceps', image: 'imagenes/triceps.png' }, //ingresado 3
    { name: 'Cuádriceps', image: 'imagenes/cuadriceps.png'}, //ingresado 3
    { name: 'Isquiotibiales', image: 'imagenes/isquiotibiales.png'}, //ingresado 3
    { name: 'Glúteos', image: 'imagenes/gluteos.png'}, //ingresado 3
    { name: 'Abdominales', image: 'imagenes/abdominales.png'}, //ingresado 3
    { name: 'Lumbar', image: 'imagenes/lumbares.png'}, //ingresado 3

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

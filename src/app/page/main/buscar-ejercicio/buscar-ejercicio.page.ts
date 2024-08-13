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
    { name: 'Espalda', image: 'assets/imagenes/espalda.png'}, //ingresdo 3
    { name: 'Hombros', image: 'assets/imagenes/hombros.png'}, //ingresado 3
    { name: 'Biceps', image: 'assets/imagenes/biceps.png'}, //ingresado 3
    { name: 'Triceps', image: 'assets/imagenes/triceps.png' }, //ingresado 3
    { name: 'Cuadriceps', image: 'assets/imagenes/cuadriceps.png'}, //ingresado 3
    { name: 'Isquiotibiales', image: 'assets/imagenes/isquiotibiales.png'}, //ingresado 3
    { name: 'Gluteos', image: 'assets/imagenes/gluteos.png'}, //ingresado 3
    { name: 'Abdominales', image: 'assets/imagenes/abdominales.png'}, //ingresado 3
    { name: 'Lumbar', image: 'assets/imagenes/lumbares.png'}, //ingresado 3

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

import { Component } from '@angular/core';
import {ReactiveFormsModule,FormGroup,FormControl, Validators} from '@angular/forms';

import { Orquidea } from '../../models/orquidea.model';
import { OrquideaService } from '../../services/orquidea.service';
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-ejercicio1',
  imports: [ReactiveFormsModule],
  templateUrl: './ejercicio1.component.html',
  styleUrl: './ejercicio1.component.css'
})
export class Ejercicio1Component {

  //propiedades
  enviado=false;
  orquideas:any;
  orquideaForm:FormGroup;

  constructor(private orquideaService: OrquideaService) {
    this.orquideaForm = new FormGroup({
      id: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[ Validators.required]),
      color: new FormControl('',[Validators.required]),
      origen: new FormControl('',[Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(100)]),
    });
    this.getOrquideas();
  }
  async getOrquideas(): Promise<void> {
    this.orquideas = await firstValueFrom(this.orquideaService.getOrquideas());
  }

  insertarOrquidea() {
    if (this.orquideaForm.valid) {
      const nuevaOrquidea: Orquidea = this.orquideaForm.value;
      this.orquideaService.agregarOrquidea(nuevaOrquidea);
      this.orquideaForm.reset();
      this.getOrquideas();
    }
  }

  selectOrquidea(orquideaSeleccionada: Orquidea) {
    this.orquideaForm.setValue(orquideaSeleccionada);
  }

  updateOrquidea() {
    if (this.orquideaForm.valid) {
      const orquideaActualizada: Orquidea = this.orquideaForm.value;
      this.orquideaService.modificarOrquidea(orquideaActualizada);
      this.orquideaForm.reset();
      this.getOrquideas();
    }
  }

  deleteOrquidea() {
    const orquideaAEliminar: Orquidea = this.orquideaForm.value;
    this.orquideaService.eliminarOrquidea(orquideaAEliminar);
    this.orquideaForm.reset();
    this.getOrquideas();
  }

  onSubmit() {
    this.enviado=true;
    if (this.orquideaForm.valid) {
      this.orquideaForm.value.id!;
      this.orquideaForm.value.nombre!;
      this.orquideaForm.value.color!;
      this.orquideaForm.value.origen!;
      this.orquideaForm.value.precio!; 
    } 
  }
}

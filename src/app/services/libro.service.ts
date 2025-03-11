import { Injectable,inject } from '@angular/core';

import { Libro } from '../models/libro.model';
import { first } from 'rxjs';
import { collection, collectionData,deleteDoc,Firestore,updateDoc } from '@angular/fire/firestore';
import { addDoc,doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  getLibros() {
    const librosCollection = collection(this.db, 'libros');
    return collectionData(librosCollection, { idField: 'id' })
      .pipe(first());
  }


  async agregarLibro(libro: Libro) {
    const librosCollection = collection(this.db, 'libros');
    const libroData = {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion,
     
    };
    await addDoc(librosCollection, libroData);
  }

  async modificarLibro(libro: Libro) {
    const documentRef = doc(this.db, 'libros', libro.id);
    await updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion,
   
    });
  }

  async eliminarLibro(libro: Libro) {
    const documentRef = doc(this.db, 'libros', libro.id);
    await deleteDoc(documentRef);
  }

  
}
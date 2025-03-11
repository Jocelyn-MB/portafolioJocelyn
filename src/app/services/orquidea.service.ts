import { Injectable,inject } from '@angular/core';

import { Orquidea } from '../models/orquidea.model';
import { first } from 'rxjs';
import { collection, collectionData,deleteDoc,Firestore,updateDoc } from '@angular/fire/firestore';
import { addDoc,doc, getDoc, setDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class OrquideaService {
  private db: Firestore = inject(Firestore);

  constructor() { }

  getOrquideas() {
      const orquideasCollection = collection(this.db, 'orquideas');
      return collectionData(orquideasCollection, { idField: 'id' })
        .pipe(first());
    }
  
    async agregarOrquidea(orquidea: Orquidea) {
        const orquideaRef= doc(this.db, 'orquideas',orquidea.id);
        const orquideaDoc= await getDoc(orquideaRef);
  
        if(orquideaDoc.exists()){
          alert('Ya existe una orquidea con ese ID');
        }
        
        await setDoc(orquideaRef,{
          nombre:orquidea.nombre,
          color:orquidea.color,
          origen:orquidea.origen,
          precio:orquidea.precio
        
        });
      }
    
      async modificarOrquidea(orquidea: Orquidea, nuevoId?: string) {
        if (nuevoId && nuevoId !== orquidea.id) {
          const nuevoIdRef = doc(this.db, 'orquideas', nuevoId);
          if ((await getDoc(nuevoIdRef)).exists()) {
            throw new Error('El nuevo ID ya está en uso');
          }
          await setDoc(nuevoIdRef, { nombre: orquidea.nombre,color:orquidea.color, origen:orquidea.origen, precio: orquidea.precio });
          await deleteDoc(doc(this.db, 'orquideas', orquidea.id));
        } else {
          await updateDoc(doc(this.db, 'orquideas', orquidea.id), {
          nombre:orquidea.nombre,
          color:orquidea.color,
          origen:orquidea.origen,
          precio:orquidea.precio,
          });
        }
      }
    
      async eliminarOrquidea(orquidea: Orquidea) {
        const documentRef = doc(this.db, 'orquideas', orquidea.id);
        await deleteDoc(documentRef);
      }
}

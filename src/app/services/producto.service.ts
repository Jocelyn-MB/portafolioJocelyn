import { Injectable,inject } from '@angular/core';

import { Producto } from '../models/producto.model';
import { first } from 'rxjs';
import { collection, collectionData,deleteDoc,Firestore,updateDoc } from '@angular/fire/firestore';
import { addDoc,doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private db: Firestore = inject(Firestore);

  constructor() { }

  getProductos() {
    const productosCollection = collection(this.db, 'productos');
    return collectionData(productosCollection, { idField: 'id' })
      .pipe(first());
  }

  async agregarProducto(producto: Producto) {
      const productoRef= doc(this.db, 'productos',producto.id);
      const productoDoc= await getDoc(productoRef);

      if(productoDoc.exists()){
        alert('Ya existe un producto con ese ID');
      }
      
      await setDoc(productoRef,{
        descripcion:producto.descripcion,
        precio:producto.precio
      });
    }
  
    async modificarProducto(producto: Producto, nuevoId?: string) {
      if (nuevoId && nuevoId !== producto.id) {
        const nuevoIdRef = doc(this.db, 'productos', nuevoId);
        if ((await getDoc(nuevoIdRef)).exists()) {
          throw new Error('El nuevo ID ya está en uso');
        }
        await setDoc(nuevoIdRef, { descripcion: producto.descripcion, precio: producto.precio });
        await deleteDoc(doc(this.db, 'productos', producto.id));
      } else {
        await updateDoc(doc(this.db, 'productos', producto.id), {
          descripcion: producto.descripcion,
          precio: producto.precio,
        });
      }
    }
  
    async eliminarProducto(producto: Producto) {
      const documentRef = doc(this.db, 'productos', producto.id);
      await deleteDoc(documentRef);
    }
}

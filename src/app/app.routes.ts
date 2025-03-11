import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibroComponent } from './pages/libro/libro.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { Ejercicio1Component } from './pages/ejercicio1/ejercicio1.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'libro',
        component:LibroComponent
    },
    {
        path:'producto',
        component:ProductoComponent
    },
    {
        path:'ejercicio1',
        component:Ejercicio1Component
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'**',
        redirectTo:'home'
    },
];

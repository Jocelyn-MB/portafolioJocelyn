import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MenuComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'saberHacer2';
}

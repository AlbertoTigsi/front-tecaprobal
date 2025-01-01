import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  selector: 'app-home',
  template: `
    <mat-toolbar color="accent">
      <span>Inicio</span>
      <div>
        <button mat-flat-button (click)="navigateToMantenimientoEstudiante()">
          <mat-icon>school</mat-icon>
          Mantenimiento Estudiante
        </button>

        <button mat-flat-button (click)="navigateToMantenimientoDocente()">
          <mat-icon>person</mat-icon>
          Mantenimiento Docente
        </button>

        <button mat-flat-button color="warn" (click)="logOut()">
          <mat-icon>exit_to_app</mat-icon>
          Salir
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button {
        margin-left: 8px;
      }
    `,
  ],
})
export default class HomeComponent {
  private _router = inject(Router);
  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  navigateToMantenimientoDocente() {
    this._router.navigateByUrl('/mantemiento-docente');
    console.log('si esta llamando.....');
  }

  navigateToMantenimientoEstudiante() {
    this._router.navigateByUrl('/mantemiento-estudiante');
    console.log('si esta llamando.....');
  }
}

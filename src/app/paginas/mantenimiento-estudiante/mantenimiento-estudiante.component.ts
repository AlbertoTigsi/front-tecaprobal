import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';  // Importa MatCardModule
import { ButtonProviders } from '../auth/components/button-providers/button-providers.component';
import { Router, RouterModule } from '@angular/router';
import { Docente } from 'src/app/core/modelo/docente';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Estudiante } from 'src/app/core/modelo/estudiante';
import { EstudianteService } from 'src/app/core/services/estudiante-service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialog } from '../dialogo/confirmation-dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-mantenimiento-estudiante',
  standalone: true,
  providers: [EstudianteService,ConfirmationDialog],
  imports: [
     MatFormFieldModule,
     MatInputModule,
     MatIconModule,
     MatButtonModule,
     ReactiveFormsModule,
     RouterModule,
     MatSnackBarModule,
     MatCardModule, // Asegúrate de agregar MatCardModule aquí
     ButtonProviders,
     CommonModule,
     NgIf,
     MatTableModule,
     MatToolbarModule,
     HttpClientModule,
     MatDialogModule
   ],
  templateUrl: './mantenimiento-estudiante.component.html',
  styleUrls: ['./mantenimiento-estudiante.component.scss']
})
export class MantenimientoEstudianteComponent implements OnInit {

  estudianteForm: FormGroup;
  hide: boolean = true;
  mostrarMantenimiento: boolean = false;
  estudianteMantenimiento:Estudiante;
  lstEstudiante:Estudiante[]=[];
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'correo', 'telefono'];
  esMantenimientoNuevo: boolean=false;

  selectedEstudiante: Estudiante;
  constructor(
    private fb: FormBuilder ,
    private _estudianteService:EstudianteService, 
    private router:Router,
    private dialog: MatDialog) {
 
  }

  ngOnInit() {

    this.buildForm()
    this.listar() 
  }

  onSubmit() {
    if (this.estudianteForm.valid) {
      console.log('Formulario enviado', this.estudianteForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }


  buildForm() {
    this.estudianteForm = this.fb.group({
      cedula: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null, Validators.required],
    });
  }


  listar() {
    this._estudianteService.listarEstudiante().subscribe(estudiantes => {
      this.lstEstudiante = estudiantes; 
      console.log(estudiantes);
    })
  }

  clickCrear(){

    this.mostrarMantenimiento=true
    this.esMantenimientoNuevo = true;
    this.estudianteMantenimiento = new Estudiante()
    this.estudianteForm.reset();
  }


  clickEditar(estudiante:Estudiante){

    console.log('Eliminar estudiante:', estudiante);
    if (estudiante) {
      this.esMantenimientoNuevo = false;
      this.mostrarMantenimiento = true;
      this.estudianteMantenimiento=estudiante; 
      this.editForm()
    }else{

    }

  }

  editForm() {
    this.estudianteForm.setValue({
      cedula: this.estudianteMantenimiento.cedula,
      correo: this.estudianteMantenimiento.correo,
      nombre: this.estudianteMantenimiento.nombre,
      apellido: this.estudianteMantenimiento.apellido,
      telefono: this.estudianteMantenimiento.telefono,
    });
  }

  clickGuardar() {
    let estudianteEnviar: Estudiante = this.estudianteForm.value as Estudiante
    this.estudianteMantenimiento.cedula =estudianteEnviar.cedula
    this.estudianteMantenimiento.correo =estudianteEnviar.correo
    this.estudianteMantenimiento.nombre =estudianteEnviar.nombre
    this.estudianteMantenimiento.apellido =estudianteEnviar.apellido
    this.estudianteMantenimiento.telefono =estudianteEnviar.telefono
    if (this.esMantenimientoNuevo == true) {

    this._estudianteService.agregarEstudiante(this.estudianteMantenimiento).subscribe(estudiantes => {
      console.log(estudiantes);
      this.listar();
      this.mostrarMantenimiento=false;
    })


    }else{

      this._estudianteService.actualizarEstudiante(this.estudianteMantenimiento).subscribe(estudiantes => {
        console.log(estudiantes);
        this.mostrarMantenimiento=false;
        this.listar();
      })

    }
  }

  selectEstudiante(estudiante: any) {
    this.selectedEstudiante = estudiante;
    console.log("el estudinate:"+ JSON.stringify (estudiante));
    
  }


  clickEliminar(estudiante: any) {
     if (estudiante) {
       // Abre el diálogo de confirmación
       const dialogRef = this.dialog.open(ConfirmationDialog, {
         data: {
           message: '¿Estás seguro de que deseas eliminar este estudiante?'
         }
       });
 
       // Espera la respuesta del diálogo
       dialogRef.afterClosed().subscribe(result => {
         if (result) {
           this.eliminarEstudiante(estudiante);
         }
       });
     }
   }
 
   eliminarEstudiante(estudiante: Docente) {
     if (estudiante.id !== undefined) {  // Verifica que el id no sea undefined
       this._estudianteService.eliminarEstudiante(estudiante.id).subscribe(() => {
         this.listar();
       });
     } else {
       console.error('El ID del estudiante es inválido');
     }
   }

  clickRegresar() {
    this.router.navigate(['/']); 
  }
}


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
import { HttpClientModule } from '@angular/common/http';
import { DocenteService } from 'src/app/core/services/docente-service';
import { HorarioService } from 'src/app/core/services/horario-service';
import { Horario } from 'src/app/core/modelo/horario';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../dialogo/confirmation-dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-mantenimiento-docente',
  standalone: true,
  providers: [DocenteService,HorarioService,ConfirmationDialog],
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
       MatSelectModule,
       MatDialogModule
     ],
  templateUrl: './mantenimiento-docente.component.html',
  styleUrls: ['./mantenimiento-docente.component.scss']
})
export class MantenimientoDocenteComponent implements OnInit {
  docenteForm: FormGroup;
  hide: boolean = true;
  mostrarMantenimiento: boolean = false;
  docenteMantenimiento:Docente;
  lstDocente:Docente[]=[];
  lstHorario:Horario[]=[];
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'correo', 'telefono', 'especialidad'];
  esMantenimientoNuevo: boolean=false;
  selectedHorario:Horario;
  selectedDocente:Docente;
  constructor(
    private fb: FormBuilder,
    private _docenteService:DocenteService, 
    private router:Router,
    private _horarioService:HorarioService,
    private dialog: MatDialog) {
 
  }

  ngOnInit() {
    this.listar() 
    this.listarHorario()
    this.buildForm()
  }

  onSubmit() {
    if (this.docenteForm.valid) {
      console.log('Formulario enviado', this.docenteForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }


  buildForm() {
    this.docenteForm = this.fb.group({
      cedula: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null, Validators.required],
      especialidad: [null, Validators.required],
      horario: [null, Validators.required]
    });
  }


  listar() {
    this._docenteService.listarDocente().subscribe(docentes => {
      this.lstDocente = docentes; 
      console.log(docentes);
    })
  }

  listarHorario() {
    this._horarioService.listarHorario().subscribe({
      next: (horarios: Horario[]) => {
        this.lstHorario = horarios.map(horario => ({
          ...horario,
          horaInicio: new Date(`1970-01-01T${horario.horaInicio}`), // Convierte la hora a un objeto Date
          horaFin: new Date(`1970-01-01T${horario.horaFin}`),       // Convierte la hora a un objeto Date
        }));
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
      },
    });
  }
  


clickCrear(){

    this.mostrarMantenimiento=true
    this.esMantenimientoNuevo = true;
    this.docenteMantenimiento = new Docente()
    this.docenteForm.reset();
  }


  clickEditar(docente:Docente){

    console.log('Eliminar docente:', docente);
    if (docente) {
      this.esMantenimientoNuevo = false;
      this.mostrarMantenimiento = true;
      this.docenteMantenimiento=docente; 
      this.editForm()
    }else{

    }

  }

  editForm() {
    this.docenteForm.setValue({
      cedula: this.docenteMantenimiento.cedula,
      correo: this.docenteMantenimiento.correo,
      nombre: this.docenteMantenimiento.nombre,
      apellido: this.docenteMantenimiento.apellido,
      telefono: this.docenteMantenimiento.telefono,
      especialidad: this.docenteMantenimiento.especialidad,
      horario: this.docenteMantenimiento.horario
    });
  }

  clickGuardar() {
    let docenteEnviar: Docente = this.docenteForm.value as Docente
    this.docenteMantenimiento.cedula =docenteEnviar.cedula
    this.docenteMantenimiento.correo =docenteEnviar.correo
    this.docenteMantenimiento.nombre =docenteEnviar.nombre
    this.docenteMantenimiento.apellido =docenteEnviar.apellido
    this.docenteMantenimiento.telefono =docenteEnviar.telefono
    this.docenteMantenimiento.horario= docenteEnviar.horario
    this.docenteMantenimiento.especialidad= docenteEnviar.especialidad
    if (this.esMantenimientoNuevo == true) {

    this._docenteService.agregarDocente(this.docenteMantenimiento).subscribe(docentes => {
      console.log(docentes);
      this.mostrarMantenimiento=false;
      this.listar()
    })


    }else{

      this._docenteService.actualizarDocente(this.docenteMantenimiento).subscribe(docentes => {
        console.log(docentes);
        this.mostrarMantenimiento=false;
        this.listar()
      })

    }
  }

  selectDocente(docente: any) {
    this.selectedDocente = docente;
    console.log("el estudinate:"+ JSON.stringify (docente));
    
  }


  clickEliminar(docente: any) {
    if (docente) {
      // Abre el diálogo de confirmación
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          message: '¿Estás seguro de que deseas eliminar este docente?'
        }
      });

      // Espera la respuesta del diálogo
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.eliminarDocente(docente);
        }
      });
    }
  }

  eliminarDocente(docente: Docente) {
    if (docente.id !== undefined) {  // Verifica que el id no sea undefined
      this._docenteService.eliminarDocente(docente.id).subscribe(() => {
        this.listar();
      });
    } else {
      console.error('El ID del docente es inválido');
    }
  }
  

  clickRegresar() {
  this.router.navigate(['/']); 
}

}



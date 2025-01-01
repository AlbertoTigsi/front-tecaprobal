import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../modelo/estudiante';
import { EstudianteDTO } from '../modelo/dtos/estudiante-dto';

@Injectable({
  providedIn: 'root',  // Asegura que el servicio esté disponible en toda la aplicación
})
export class EstudianteService {
  private baseUrl = 'http://localhost:8080/estudiante/';

  constructor(private http: HttpClient) { }


  // Método POST: Crear un nuevo estudiante
  agregarEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.baseUrl}crear`, estudiante);
  }

  listarEstudiante(): Observable<[EstudianteDTO]> {
    
    return this.http.get<[EstudianteDTO]>(`${this.baseUrl + 'listar'}`);
  }

  buscarPorCedula(cedula: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/buscarporcedula/${cedula}`);
  }

  eliminarEstudiante(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl + 'eliminar'}/${id}`);
  }

   // Método PUT: Actualizar un estudiante existente
   actualizarEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.baseUrl}editar`, estudiante);
  }
}

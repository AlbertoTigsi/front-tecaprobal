import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../modelo/docente';
import { DocenteDTO } from '../modelo/dtos/docente-dto';

@Injectable({
  providedIn: 'root',  // Asegura que el servicio esté disponible en toda la aplicación
})
export class DocenteService {
  private baseUrl = 'http://localhost:8080/docente/';

  constructor(private http: HttpClient) { }


  // Método POST: Crear un nuevo docente
  agregarDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.baseUrl}crear`, docente);
  }

  listarDocente(): Observable<[DocenteDTO]> {
    
    return this.http.get<[DocenteDTO]>(`${this.baseUrl + 'listar'}`);
  }

  buscarPorCedula(cedula: string): Observable<Docente> {
    return this.http.get<Docente>(`${this.baseUrl}/buscarporcedula/${cedula}`);
  }

  eliminarDocente(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl + 'eliminar'}/${id}`);
  }
  

   // Método PUT: Actualizar un docente existente
   actualizarDocente(docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.baseUrl}editar`, docente);
  }
}

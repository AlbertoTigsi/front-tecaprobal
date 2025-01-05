import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../modelo/horario';


@Injectable({
  providedIn: 'root',  // Asegura que el servicio esté disponible en toda la aplicación
})
export class HorarioService {
  private baseUrl = 'https://tecaprobal-api.onrender.com/horario/';

  constructor(private http: HttpClient) { }


  listarHorario(): Observable<[Horario]> {
    return this.http.get<[Horario]>(`${this.baseUrl + 'listar'}`);
  }

 
}

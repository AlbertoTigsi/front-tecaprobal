import { Horario } from "./horario";

export class Docente {
    id?: number;
    cedula?: string;
    nombre?: string;
    apellido?: string;
    correo?: string;
    telefono?: string;
    especialidad?: string;
    horario?:Horario
}
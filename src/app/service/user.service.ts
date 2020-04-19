import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuario = new Usuario();
  constructor() {
    this.usuario.nombre = localStorage.getItem('nameUser')
  }

  sesionUsuario(nombre:String):String{
    return this.usuario.nombre = nombre
  }
  recuperarUsuario():String{
    return this.usuario.nombre
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //variables
  mosInputName:boolean = false
  nameUser:String
  verUsuario:boolean = false
  //objetos
  nuevoNombre = new FormControl()
  constructor(public usuarioInjectado:UserService, private ruta:Router) { }

  ngOnInit() {
    this.usuarioInjectado.usuario.nombre
    if(localStorage.getItem('nameUser')!=null || localStorage.getItem('nameUser')==""){
      this.verUsuario = true
    }
  }
  MostrarCampoNombre(){
    this.mosInputName = true
  }
  GuardarNombre(){
    if(this.nuevoNombre!=null){
      this.usuarioInjectado.usuario.nombre = this.nuevoNombre.value
      localStorage.setItem('nameUser',this.usuarioInjectado.usuario.nombre)
      this.nuevoNombre.setValue(null)
      this.mosInputName = false
    }
  }
  eliminarCuenta(){
    localStorage.removeItem('links')
    localStorage.removeItem('nameUser')
    //Esta funcion permite recargar la pagina
    location.reload()
  }

}

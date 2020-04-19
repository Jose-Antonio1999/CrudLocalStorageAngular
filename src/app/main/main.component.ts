import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Link } from '../Clases/link';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  link = new Link()
  nuevoLink = new Array<Link>()
  fecha = new Date()
  pLink =  new FormControl()
  pDescripcion = new FormControl()
  //variables
  fech:String
  Alert:boolean = false
  successAlert:boolean = false
  mensaje:string
  buttonSaveEditar:boolean = false
  idAEditar:number
  nameUser:String
  constructor(private ruta: Router, private usuarioInjectado: UserService) { }

  ngOnInit() {
    this.bienvenida()
    this.nameUser = localStorage.getItem('nameUser')
    console.log(this.usuarioInjectado.recuperarUsuario())
    if(localStorage.getItem('nameUser')==null){
      this.ruta.navigateByUrl('')
    }
    if(localStorage.getItem('links')!=null){
      this.nuevoLink = JSON.parse(localStorage.getItem('links'))
    }
  }

  guardar(){
   if(this.pLink.value==null || this.pLink.value=='' || this.pDescripcion.value==null || this.pDescripcion.value==''){
     this.mensajeDanger("Todos los campos son requeridos")
   }else{
    this.fech = this.fecha.getDate() + '/' + this.fecha.getDay() + '/' + this.fecha.getFullYear()
    this.link.link = this.pLink.value
    this.link.fechaCreacion = this.fech
    this.link.descripcion = this.pDescripcion.value
    this.nuevoLink.push(this.link)
    localStorage.setItem('links',JSON.stringify(this.nuevoLink))
    this.limpiarFormulario()
    this.ActualizarLinks()
    //mostramos mensaje de exito
    this.mensajeSuccessfull("Link guardado correctamente")
   }
  }

  limpiarFormulario(){
    this.pLink.setValue("")
    this.pDescripcion.setValue("")
    this.buttonSaveEditar=false
  }

  ActualizarLinks(){
    this.nuevoLink = JSON.parse(localStorage.getItem('links'))
  }

  eliminarLink(i:number){
    this.nuevoLink.splice(i,1)
    //una vez eliminado guardamos en localstorage
    localStorage.setItem('links',JSON.stringify(this.nuevoLink))
    this.mensajeSuccessfull("Link eliminado correctamente")
  }

  editar(i:number){
    this.idAEditar = i
    this.buttonSaveEditar = true
    this.pLink.setValue(this.nuevoLink[i].link)
    this.pDescripcion.setValue(this.nuevoLink[i].descripcion)
  }

  guardarCambios(){
    this.fech = this.fecha.getDate() + '/' + this.fecha.getDay() + '/' + this.fecha.getFullYear()
    this.link.link = this.pLink.value
    this.link.descripcion = this.pDescripcion.value
    this.link.fechaCreacion = this.fech
    console.log(this.link)
    this.nuevoLink[this.idAEditar] = this.link
    //una vez editado guardamos en localstorage
    localStorage.setItem('links',JSON.stringify(this.nuevoLink))
    //limpiamos el formulario
    this.limpiarFormulario()
    //mostramos el boton guardar
    this.buttonSaveEditar = false
    //mostramos mensaje de exito
    this.mensajeSuccessfull("Link editado correctamente")
  }

  mensajeSuccessfull(pMensaje:String){
    //mostramos mensaje de exito
    this.mensaje = ''+pMensaje
    this.successAlert = true
      setTimeout(() => {
        this.successAlert = false
    },3000);
  }

  mensajeDanger(pMensaje:String){
    this.mensaje = ''+pMensaje
    this.Alert = true
      setTimeout(() => {
        this.Alert = false
    },3000);
  }
  bienvenida(){
    this.mensajeSuccessfull("Hola "+ localStorage.getItem('nameUser')+" listo para guardar tus links favoritos !!")
  }
}

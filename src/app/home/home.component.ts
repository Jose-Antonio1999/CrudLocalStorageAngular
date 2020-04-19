import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private UsuarioInjectado: UserService,private ruta:Router) { }

  ngOnInit() {
    if(localStorage.getItem('nameUser')==null){
      console.log("Registrate")
    }else{
      this.ruta.navigateByUrl('/main')
    }
  }
  usuario = new FormControl();
  guardarUsuario(){
    this.UsuarioInjectado.sesionUsuario(this.usuario.value)
    localStorage.setItem('nameUser',this.usuario.value)
    this.ruta.navigateByUrl('/main')
  }
}

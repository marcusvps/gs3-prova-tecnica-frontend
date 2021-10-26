import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {

  constructor(private router: Router,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  isUserAdmin(): boolean{
    let usuario = this.localStorage.get("usuario");
    return usuario.tipoPerfil === 'ADMIN';
  }

  openClientes(){
    this.router.navigateByUrl("/list");
  }

  openHistorico(){
    this.router.navigateByUrl("/historico");
  }

  deslogar(){
    this.localStorage.remove("usuario");
    this.router.navigateByUrl("/login");
  }


}

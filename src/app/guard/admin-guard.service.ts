import {Injectable} from '@angular/core';
import {LocalStorageService} from '../service/local-storage.service';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   let isUserAdmin = false;
   let usuarioLogado = this.localStorage.get('usuario');
   if(usuarioLogado){
     isUserAdmin = usuarioLogado.tipoPerfil === 'ADMIN';
   }

   if(!isUserAdmin){
     alert("Você não pode acessar essa página.")
     this.router.navigateByUrl("/login");
   }

    return isUserAdmin;
  }
}

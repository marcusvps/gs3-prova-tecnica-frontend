import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  password: any;
  erros:any = [];

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }


  autenticar(): void {
    this.httpClient.get('http://localhost:8080/api/autenticar', {
      params: {
        login: this.login,
        senha: this.password
      }

    })
      .subscribe((data) => {
        if(data){
          this.localStorage.set("usuario",data);
          this.router.navigateByUrl("/list");
        }
        },
        error => {
          this.erros = [];
          this.erros.push(error.error.erro);
        });
  }
}

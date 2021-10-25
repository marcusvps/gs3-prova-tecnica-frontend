import { Component, OnInit } from '@angular/core';
import {HistoricoOperacao} from '../../../model/HistoricoOperacao';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../service/local-storage.service';

@Component({
  selector: 'app-list-historico',
  templateUrl: './list-historico.component.html',
  styleUrls: ['./list-historico.component.css']
})
export class ListHistoricoComponent implements OnInit {

  historicos:any = [];

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.buscarHistoricos()
  }


  buscarHistoricos(){
    let usuario = this.localStorage.get("usuario");
    this.httpClient.get("http://localhost:8080/api/historico/" + usuario.id)
      .subscribe((data) => {
          this.historicos = data;
        }
      ,error => {
          alert("Erro: " + error.error.erro);
        }
      )

  }


}

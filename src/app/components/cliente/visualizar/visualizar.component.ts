import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../model/Cliente';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  clienteSelecionado:Cliente;
  cpfMask = "000.000.000-00";
  cepMask = "00000-000"

  constructor(private router: Router, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.queryParams.subscribe(params => this.clienteSelecionado = JSON.parse(params['clienteSelecionado']));

  }

  ngOnInit(): void {
  }

  recuperarMascaraTelefone(telefone) {
    if(telefone.tipoTelefone === 'CELULAR'){
      return "(00) 00000-0000";
    }
    return '(00) 0000-0000';
  }

  voltar() {
    this.router.navigateByUrl('/list');
  }
}

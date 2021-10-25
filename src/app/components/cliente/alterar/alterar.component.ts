import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../model/Cliente';
import {Endereco} from '../../../model/Endereco';
import {Telefone} from '../../../model/Telefone';
import {Email} from '../../../model/Email';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../../../service/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit {

  clienteAAlterar:Cliente;

  cpfMask = "000.000.000-00";
  cepMask = "00000-000"

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService,
              private activatedRouter: ActivatedRoute,
              private router:Router) {


  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => this.clienteAAlterar = JSON.parse(params['clienteSelecionado']));

  }

  adicionarInputTelefone(){
    if(!this.clienteAAlterar.telefones) this.clienteAAlterar.telefones = [];
    let novoTelefone = new Telefone();
    this.clienteAAlterar.telefones.push(novoTelefone)
  }

  adicionarInputEmail(){
    if(!this.clienteAAlterar.emails) this.clienteAAlterar.emails = [];
    let novoEmail = new Email();
    this.clienteAAlterar.emails.push(novoEmail)
  }
  buscarEnderecoPeloCEP() {
    let usuario = this.localStorage.get("usuario");
    if(this.clienteAAlterar.endereco.cep){
      this.httpClient.get("http://localhost:8080/api/endereco/" + this.clienteAAlterar.endereco.cep,{params:{
          idUsuarioLogado: usuario.id
        }})
        .subscribe( (data) =>{
          this.clienteAAlterar.endereco.cidade = data['cidade'];
          this.clienteAAlterar.endereco.uf = data['uf'];
          this.clienteAAlterar.endereco.bairro = data['bairro'];
          this.clienteAAlterar.endereco.logradouro = data['logradouro'];
          this.clienteAAlterar.endereco.complemento = data['complemento'];
        }, error => {
          alert("Erro: " + error.error.erro)
        })
    }
  }

  recuperarMascaraTelefone(telefone) {
    if(telefone.tipoTelefone === 'CELULAR'){
      return "(00) 00000-0000";
    }
    return '(00) 0000-0000';
  }

  salvar(){
    this.httpClient.put("http://localhost:8080/api/cliente/alterar",this.clienteAAlterar)
      .subscribe(() =>{
          this.router.navigateByUrl('/list');
        },
        error => {
          if(error.error.erros){
            alert("Erro: " + error.error.erros);
          }else{
            alert("Erro: " + error.error.erro);
          }

        })
  }

  voltar() {
    this.router.navigateByUrl('/list');
  }

}

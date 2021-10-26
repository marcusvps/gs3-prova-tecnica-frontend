import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../../../service/local-storage.service';
import {Cliente} from '../../../model/Cliente';
import {Telefone} from '../../../model/Telefone';
import {Email} from '../../../model/Email';
import {Router} from '@angular/router';
import {Endereco} from '../../../model/Endereco';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  erros:any = [];
  cliente:Cliente;

  cpfMask = "000.000.000-00";
  cepMask = "00000-000"

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.cliente.endereco = new Endereco();
    this.adicionarInputTelefone();
    this.adicionarInputEmail();
  }

  adicionarInputTelefone(){
    if(!this.cliente.telefones) this.cliente.telefones = [];
    let novoTelefone = new Telefone();
    novoTelefone.tipoTelefone = "RESIDENCIAL";
    this.cliente.telefones.push(novoTelefone)
  }

  adicionarInputEmail(){
    if(!this.cliente.emails) this.cliente.emails = [];
    let novoEmail = new Email();
    this.cliente.emails.push(novoEmail)
  }
  buscarEnderecoPeloCEP() {
    this.erros = [];
    let usuario = this.localStorage.get("usuario");
    if(this.cliente.endereco.cep){
    this.httpClient.get("http://localhost:8080/api/endereco/" + this.cliente.endereco.cep,{headers: {'Authorization': usuario.id.toString()}})
      .subscribe( (data) =>{
        this.cliente.endereco.cidade = data['cidade'];
        this.cliente.endereco.uf = data['uf'];
        this.cliente.endereco.bairro = data['bairro'];
        this.cliente.endereco.logradouro = data['logradouro'];
        this.cliente.endereco.complemento = data['complemento'];
      }, error => {
        this.erros = [];
        this.erros.push(error.error.erro);
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
    let usuario = this.localStorage.get("usuario");
    this.erros = [];
    this.httpClient.post("http://localhost:8080/api/cliente/salvar",this.cliente,{headers: {'Authorization': usuario.id.toString()}})
      .subscribe(() =>{
        this.router.navigateByUrl('/list');
      },
        error => {
          this.erros = [];
        if(error.error.erros){
          this.erros = error.error.erros;
        }else{
          this.erros.push(error.error.erro);
        }

        })
  }

  voltar() {
    this.router.navigateByUrl('/list');
  }
}

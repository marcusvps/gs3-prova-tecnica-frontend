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

  novoCliente:Cliente;

  cpfMask = "000.000.000-00";
  cepMask = "00000-000"

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.novoCliente = new Cliente();
    this.novoCliente.endereco = new Endereco();
    this.adicionarInputTelefone();
    this.adicionarInputEmail();
  }

  adicionarInputTelefone(){
    if(!this.novoCliente.telefones) this.novoCliente.telefones = [];
    let novoTelefone = new Telefone();
    this.novoCliente.telefones.push(novoTelefone)
  }

  adicionarInputEmail(){
    if(!this.novoCliente.emails) this.novoCliente.emails = [];
    let novoEmail = new Email();
    this.novoCliente.emails.push(novoEmail)
  }
  buscarEnderecoPeloCEP() {
    let usuario = this.localStorage.get("usuario");
    if(this.novoCliente.endereco.cep){
    this.httpClient.get("http://localhost:8080/api/endereco/" + this.novoCliente.endereco.cep,{params:{
        idUsuarioLogado: usuario.id
      }})
      .subscribe( (data) =>{
        this.novoCliente.endereco.cidade = data['cidade'];
        this.novoCliente.endereco.uf = data['uf'];
        this.novoCliente.endereco.bairro = data['bairro'];
        this.novoCliente.endereco.logradouro = data['logradouro'];
        this.novoCliente.endereco.complemento = data['complemento'];
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
    let usuario = this.localStorage.get("usuario");

    this.httpClient.post("http://localhost:8080/api/cliente/salvar",this.novoCliente)
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

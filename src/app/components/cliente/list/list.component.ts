import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../service/local-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  clientes:any = [];
  cpfMask = "000.000.000-00";

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {

    let usuario = this.localStorage.get("usuario");
    this.httpClient.get('http://localhost:8080/api/cliente',{
      params:{
        idUsuarioLogado: usuario.id
      }
    })
      .subscribe(data => {
          this.clientes = data;
        },
        error => {
          alert("Erro: " + error.error.erro);
        });
  }

  isUserAdmin(): boolean{
    let usuario = this.localStorage.get("usuario");
    return usuario.tipoPerfil === 'ADMIN';
  }

  novoCliente() : void{
    this.router.navigateByUrl("/novo");
  }

  alterarCliente(cliente) : void{
    this.router.navigate(['/editar'], {queryParams: {clienteSelecionado: JSON.stringify(cliente)}, skipLocationChange:true});
  }

  removerCliente(cliente): void{
    this.httpClient.delete('http://localhost:8080/api/cliente/remover/' + cliente.id)
      .subscribe(() => {
          alert("Removido com sucesso")
          this.getClientes();
      }
        , error => alert('Erro: ' + error.error.erro));
  }

  visualizarCliente(cliente) : void{
    this.router.navigate(['/viewCliente'], {queryParams: {clienteSelecionado: JSON.stringify(cliente)}, skipLocationChange:true});
  }

}

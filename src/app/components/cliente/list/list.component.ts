import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../service/local-storage.service';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  clientes: any = [];
  erros:any = [];

  cpfMask = '000.000.000-00';

  constructor(private httpClient: HttpClient,
              private router: Router,
              private localStorage: LocalStorageService,
              private modalService: ModalDialogService,
              private viewRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    let usuario = this.localStorage.get('usuario');
    this.httpClient.get('http://localhost:8080/api/cliente', {headers: {'Authorization': usuario.id.toString()}})
      .subscribe(data => {
          this.clientes = data;
        },
        error => {
          this.erros = [];
          this.erros.push(error.error.erro);
        });
  }

  isUserAdmin(): boolean {
    let usuario = this.localStorage.get('usuario');
    return usuario.tipoPerfil === 'ADMIN';
  }

  novoCliente(): void {
    this.router.navigateByUrl('/novo');
  }

  alterarCliente(cliente): void {
    this.router.navigate(['/editar'], {queryParams: {clienteSelecionado: JSON.stringify(cliente)}, skipLocationChange: true});
  }

  confirmarRemocao(cliente){
    this.modalService.openDialog(this.viewRef, {
      title: 'Sair',
      childComponent: SimpleModalComponent,
      data: {text: 'Deseja realmente excluir o(a) cliente ' + cliente.nome + "?"},
      actionButtons: [
        { text: 'Cancelar', buttonClass: 'btn btn-secondary' }, // no special processing here
        { text: 'Sim, desejo excluir', buttonClass:'btn btn-danger', onAction: () => this.removerCliente(cliente) }
      ]
    });
  }

  removerCliente(cliente): void {
    let usuario = this.localStorage.get("usuario");
    this.httpClient.delete('http://localhost:8080/api/cliente/remover/' + cliente.id,{headers: {'Authorization': usuario.id.toString()}})
      .subscribe(() => {
          window.location.reload();
        }
        , error => alert('Erro: ' + error.error.erro));
  }

  visualizarCliente(cliente): void {
    this.router.navigate(['/viewCliente'], {queryParams: {clienteSelecionado: JSON.stringify(cliente)}, skipLocationChange: true});
  }

}

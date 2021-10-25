import {Endereco} from './Endereco';
import {Email} from './Email';
import {Telefone} from './Telefone';

export class Cliente{
  nome:string;
  cpf:string;
  endereco:Endereco;
  emails: Email[];
  telefones: Telefone[];

}

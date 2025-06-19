const Funcionario = require('./Funcionario');

class Vistoriador extends Funcionario {
  constructor(id, cpf, email, nome, senha, telefone, idVistoriador) {
    super(id, cpf, email, nome, senha, telefone);
    this.idVistoriador = idVistoriador;
  }

  realizarVistoria() {
    console.log("Realizar vistoria");
  }

  criarRelatorio() {
    console.log("Criar relatório");
  }

  finalizarVistoria() {
    console.log("Finalizar vistoria");
  }
}

module.exports = Vistoriador;

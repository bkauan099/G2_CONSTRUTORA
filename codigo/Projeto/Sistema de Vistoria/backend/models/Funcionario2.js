const User = require('./user');

class Funcionario extends User {
  constructor(id, cpf, email, nome, senha, telefone) {
    super(id, cpf, email, nome, senha, telefone);
    if (new.target === Funcionario) {
      throw new Error("Classe abstrata Funcionario não pode ser instanciada diretamente.");
    }
  }

  editarImoveis() {
    console.log("Editar imóveis");
  }

  listarImoveis() {
    console.log("Listar imóveis");
  }

  adicionarVistoria() {
    console.log("Adicionar vistoria");
  }

  deletarVistoria() {
    console.log("Deletar vistoria");
  }

  editarVistoria() {
    console.log("Editar vistoria");
  }
}

module.exports = Funcionario;
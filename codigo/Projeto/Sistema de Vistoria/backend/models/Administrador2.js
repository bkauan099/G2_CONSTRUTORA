const Funcionario = require('./Funcionario2');

class Administrador extends Funcionario {
  constructor(props) {
    super(props);
  }

  cadastrarFuncionario() {
    console.log("Cadastrar funcionário");
  }

  deletarFuncionario() {
    console.log("Deletar funcionário");
  }

  editarFuncionario() {
    console.log("Editar funcionário");
  }

  listarFuncionarios() {
    console.log("Listar funcionários");
  }

  cadastrarImoveis() {
    console.log("Cadastrar imóveis");
  }

  deletarImoveis() {
    console.log("Deletar imóveis");
  }
}

module.exports = Administrador;

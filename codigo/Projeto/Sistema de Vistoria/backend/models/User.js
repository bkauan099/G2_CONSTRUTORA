
class User {
  constructor({ id, cpf, email, nome, senha, telefone } = {}) {
    this.id = id;
    this.cpf = cpf;
    this.email = email;
    this.nome = nome;
    this.senha = senha;
    this.telefone = telefone;
  }
}

module.exports = User;
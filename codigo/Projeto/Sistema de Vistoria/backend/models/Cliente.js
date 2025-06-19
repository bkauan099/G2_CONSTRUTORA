const User = require('./user');

class Cliente extends User {
  constructor(id, cpf, email, nome, senha, telefone) {
    super(id, cpf, email, nome, senha, telefone);
  }
}

module.exports = Cliente;
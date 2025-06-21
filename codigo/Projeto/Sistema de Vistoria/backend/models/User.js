const User = require('./user');

class Cliente extends User {
  constructor(id, cpf, email, nome, senha, telefone) {
    super(id, cpf, email, nome, senha, telefone);
    this.vistorias = [];
  }

  agendarVistoria(vistoria) {
    this.vistorias.push(vistoria);
  }

  validarVistoria(vistoriaId) {
    const vistoria = this.vistorias.find(v => v.id === vistoriaId);
    if (vistoria) {
      vistoria.status = 'VALIDADA';
    }
  }
}

module.exports = User;
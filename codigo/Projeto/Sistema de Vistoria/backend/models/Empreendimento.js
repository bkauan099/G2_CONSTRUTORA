class Empreendimento {
  constructor(id, idEndereco, nome, descricao, construtora, dataEntrega, observacoes, cidade, estado, cep, rua) {
    this.id = id;
    this.idEndereco = idEndereco;
    this.nome = nome;
    this.descricao = descricao;
    this.construtora = construtora;
    this.dataEntrega = dataEntrega;
    this.observacoes = observacoes;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.rua = rua;
    this.imoveis = []; // array de Imoveis (já estava correto)
  }

  adicionarImovel(imovel) {
    this.imoveis.push(imovel);
  }
}

module.exports = Empreendimento;

class Imovel {
  constructor(id, descricao, status, observacao, numeroUnidade) {
    this.id = id;
    this.descricao = descricao;
    this.status = status; // enum
    this.vistoriasRealizadas = 0;
    this.observacao = observacao;
    this.anexos = []; // documentos
    this.numeroUnidade = numeroUnidade;
    this.empreendimentos = []; // AGORA: um array de Empreendimentos
  }

  adicionarAnexo(documento) {
    this.anexos.push(documento);
  }

  registrarVistoria() {
    this.vistoriasRealizadas += 1;
  }

  vincularEmpreendimento(empreendimento) {
    this.empreendimentos.push(empreendimento);
  }
}

module.exports = Imovel;

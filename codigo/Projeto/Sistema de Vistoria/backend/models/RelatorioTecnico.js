class RelatorioTecnico {
  constructor(idVistoria) {
    this.idVistoria = idVistoria;
    this.estadoConservacaoEstrutura = null;
    this.estadoConservacaoPintura = null;
    this.estadoInstalacaoEletrica = null;
    this.estadoInstalacaoHidraulica = null;
    this.estadoTelhado = null;
    this.estadoPiso = null;
    this.segurancaPortasJanelas = false;
    this.funcionamentoSistemaAlarme = false;
    this.presencaPragas = false;
    this.presencaInfiltracoes = false;
    this.anexos = [];
  }

  adicionarAnexo(documento) {
    this.anexos.push(documento);
  }

  atualizarEstado(tecnica) {
    Object.assign(this, tecnica); // permite atualizar vários campos de uma vez
  }
}

module.exports = RelatorioTecnico;

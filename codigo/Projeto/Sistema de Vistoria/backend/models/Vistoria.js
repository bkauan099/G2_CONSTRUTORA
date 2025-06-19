const RelatorioTecnico = require('./RelatorioTecnico');

class Vistoria {
  constructor(id, idCliente, idImovel, idVistoriador, dataInicio, dataFim, status) {
    this.id = id;
    this.idCliente = idCliente;
    this.idImovel = idImovel;
    this.idVistoriador = idVistoriador;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.status = status;
    this.relatorio = new RelatorioTecnico(id);
  }

  associarRelatorio(relatorio) {
    this.relatorio = relatorio;
  }

  finalizarVistoria(dataFim) {
    this.dataFim = dataFim;
    this.status = 'FINALIZADA';
  }
}

module.exports = Vistoria;

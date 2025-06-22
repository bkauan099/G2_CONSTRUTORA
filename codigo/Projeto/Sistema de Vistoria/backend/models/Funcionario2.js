const User = require('./user');
const supabase = require('../db'); // Certifique-se de que o caminho está correto

class Funcionario extends User {
  constructor(props) {
    super(props);
  }
  editarImoveis() {
    console.log("Editar imóveis");
  }

  listarImoveis() {
    console.log("Listar imóveis");
  }

  async adicionarVistoria({ id_imovel, id_vistoriador, data_inicio, observacoes }) {
    // 1. Recupera o idCliente relacionado ao imóvel
    const { data: imoveis, error: imovelError } = await supabase
      .from('imovel')
      .select('id_cliente')
      .eq('id', id_imovel)
      .limit(1);

    if (imovelError) {
      throw new Error(`Erro ao buscar imóvel: ${imovelError.message}`);
    }
    if (!imoveis || imoveis.length === 0) {
      throw new Error('Imóvel não encontrado.');
    }
    const idCliente = imoveis[0].id_cliente;

    // 2. Insere a vistoria
    const { data, error } = await supabase
      .from('vistoria')
      .insert([
        {
          id_imovel: id_imovel,
          id_vistoriador: id_vistoriador,
          data_inicio: data_inicio,
          id_cliente: idCliente
        }
      ]);

    if (error) {
      throw new Error(`Erro ao inserir vistoria: ${error.message}`);
    }

    return data;
  }

  deletarVistoria() {
    console.log("Deletar vistoria");
  }

  editarVistoria() {
    console.log("Editar vistoria");
  }
}

module.exports = Funcionario;
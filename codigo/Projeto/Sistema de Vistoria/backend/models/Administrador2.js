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

    // Função para cadastrar imóvel completo
  async cadastrarImoveis({ endereco, empreendimento, imovel }) {
    // 1. Inserir Endereço
    const { data: enderecoData, error: enderecoError } = await supabase
      .from('endereco')
      .insert([endereco])
      .select()
      .single();

    if (enderecoError) {
      throw new Error(`Erro ao cadastrar endereço: ${enderecoError.message}`);
    }

    const id_endereco = enderecoData.id;

    // 2. Inserir Empreendimento com id_endereco
    const { data: empreendimentoData, error: empreendimentoError } = await supabase
      .from('empreendimento')
      .insert([{ ...empreendimento, id_endereco }])
      .select()
      .single();

    if (empreendimentoError) {
      throw new Error(`Erro ao cadastrar empreendimento: ${empreendimentoError.message}`);
    }

    const id_empreendimento = empreendimentoData.id;

    // 3. Inserir Imóvel com id_empreendimento
    const { data: imovelData, error: imovelError } = await supabase
      .from('imovel')
      .insert([{ ...imovel, id_empreendimento }])
      .select();

    if (imovelError) {
      throw new Error(`Erro ao cadastrar imóvel: ${imovelError.message}`);
    }

    return {
      endereco: enderecoData,
      empreendimento: empreendimentoData,
      imovel: imovelData
    };
  }

  deletarImoveis() {
    console.log("Deletar imóveis");
  }
}

module.exports = Administrador;

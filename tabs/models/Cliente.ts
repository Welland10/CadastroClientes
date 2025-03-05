export interface Cliente {
    id?: string; // Identificador único opcional (caso venha do Firebase)
    nomeCompleto: string;
    endereco: {
      rua: string;
      numero: string;
      cep: string;
      bairro: string;
      cidade: string;
      estado: string;
    };
    email: string;
    telefone: string;
    empresa: string;
    areaAtuacao: string;
    dataCadastro: string; // Data sempre gerada automaticamente
  }
  
  // Função auxiliar para criar um novo cliente com a data de cadastro automática
  export const criarNovoCliente = (
    nomeCompleto: string,
    endereco: Cliente["endereco"],
    email: string,
    telefone: string,
    empresa: string,
    areaAtuacao: string
  ): Cliente => {
    return {
      nomeCompleto,
      endereco,
      email,
      telefone,
      empresa,
      areaAtuacao,
      dataCadastro: new Date().toISOString(), // Gera a data atual
    };
  };
  
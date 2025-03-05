export interface Admin {
    id?: string; // Identificador único opcional
    usuario: string;
    senha: string; // Senha armazenada de forma segura
    palavraSeguranca: string; // Palavra para recuperação da senha
  }
  
  // Função auxiliar para criar um novo administrador
  export const criarNovoAdmin = (
    usuario: string,
    senha: string,
    palavraSeguranca: string
  ): Admin => {
    return {
      usuario,
      senha,
      palavraSeguranca,
    };
  };
  

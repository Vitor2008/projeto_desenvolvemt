import {
  buscarDesaparecidos,
  buscarDetalheDesaparecido,
  buscarDesaparecidosComFiltro,
  enviarInformacoes,
} from "../Services/DesaparecidosServices";

// Tipagem dos dados principais
interface FiltrosDesaparecidos {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "MASCULINO" | "FEMININO";
  status?: "DESAPARECIDO" | "LOCALIZADO";
  pagina?: number;
  porPagina?: number;
}

export const DesaparecidosController = {
  async listarTodos() {
    try {
      return await buscarDesaparecidos();
    } catch (error) {
      console.error("Controller - Erro ao listar desaparecidos:", error);
      return [];
    }
  },

  async listarComFiltro(filtros: FiltrosDesaparecidos) {
    try {
      return await buscarDesaparecidosComFiltro(filtros);
    } catch (error) {
      console.error("Controller - Erro ao listar com filtros:", error);
      return [];
    }
  },

  async obterDetalhes(id: number) {
    try {
      return await buscarDetalheDesaparecido(id);
    } catch (error) {
      console.error("Controller - Erro ao obter detalhes:", error);
      throw error; 
    }
  },

  async enviarInformacoes(dados: {
    informacao: string;
    data: string;
    ocoId: number;
    id: number;
    anexos?: File[];
  }) {
    try {
      return await enviarInformacoes(dados);
    } catch (error) {
      console.error("Controller - Erro ao enviar informações:", error);
      return null;
    }
  },
};

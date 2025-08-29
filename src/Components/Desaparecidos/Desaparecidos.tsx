// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { buscarDesaparecidos, buscarDetalheDesaparecido, buscarDesaparecidosComFiltro } from "../../Services/DesaparecidosServices";
// import FotoPessoa  from '../../Helper/FotoPessoa';

// interface Desaparecido {
//   id: number;
//   nome: string;
//   idade: number;
//   urlFoto: string;
//   vivo: boolean;
//   ultimaOcorrencia: {
//     localDesaparecimentoConcat: string;
//     dataDesaparecimento: string,
//     dataLocalizacao: string
//   };
// }

const Desaparecidos = () => {

  // const [desaparecidos, setDesaparecidos] = useState<Desaparecido[]>([]);
  // const [paginaAtual, setPaginaAtual] = useState(1);
  // const [itensPorPagina] = useState(10); // Parametriza a quantidades de cards por página
  // const navigate = useNavigate();

  // const location = useLocation();

  // const [nome, setNome] = useState(location.state?.nome || "");
  // const [faixaIdadeInicial, setIdadeMin] = useState(location.state?.faixaIdadeInicial || "");
  // const [faixaIdadeFinal, setIdadeMax] = useState(location.state?.faixaIdadeFinal || "");
  // const [sexo, setSexo] = useState(location.state?.sexo || "");
  // const [status, setStatus] = useState(location.state?.status || "");


  // useEffect(() => {
  //   const obterDesaparecidos = async () => {
  //     const dados = await buscarDesaparecidos();
  //     setDesaparecidos(dados);
  //   };

  //   obterDesaparecidos();

  //   // Se houver filtros salvos no state, aciona a pesquisa automaticamente
  //   if (location.state) {
  //     handlePesquisar();
  //   }
  // }, [location.state]);

  // const handlePesquisar = async () => {
  //   try {
  //     const filtros = {
  //       nome: nome,
  //       ffaixaIdadeInicial: faixaIdadeInicial ? Number(faixaIdadeInicial) : undefined,
  //       faixaIdadeFinal: faixaIdadeFinal ? Number(faixaIdadeFinal) : undefined,
  //       sexo: sexo as "MASCULINO" | "FEMININO" | undefined,
  //       status: status as "DESAPARECIDO" | "LOCALIZADO" | undefined,
  //     };

  //     const dadosFiltrados = await buscarDesaparecidosComFiltro(filtros);
  //     setDesaparecidos(dadosFiltrados);
  //     setPaginaAtual(1); 
  //   } catch (error) {
  //     console.error("Erro ao buscar desaparecidos com filtro:", error);
  //   }
  // };

  // const handleDetalhesClick = async (id: number) => {
  //   try {
  //     const detalhes = await buscarDetalheDesaparecido(id);
  //     navigate(`/detalhes/${id}`, { state: { detalhes, nome, faixaIdadeInicial, faixaIdadeFinal, sexo, status } });
  //   } catch (error) {
  //     console.error("Erro ao buscar detalhes:", error);
  //   }
  // };

  // const indiceUltimoItem = paginaAtual * itensPorPagina;
  // const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  // const desaparecidosPaginados = desaparecidos.slice(indicePrimeiroItem, indiceUltimoItem);

  // const totalPaginas = Math.ceil(desaparecidos.length / itensPorPagina);

  return (
    <>
    </>
  )
}

export default Desaparecidos

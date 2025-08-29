import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { buscarDesaparecidos, buscarDetalheDesaparecido, buscarDesaparecidosComFiltro } from "../../Services/DesaparecidosServices";
import FotoPessoa  from '../../Helper/FotoPessoa';

interface Desaparecido {
  id: number;
  nome: string;
  idade: number;
  urlFoto: string;
  vivo: boolean;
  ultimaOcorrencia: {
    localDesaparecimentoConcat: string;
    dataDesaparecimento: string,
    dataLocalizacao: string
  };
}

const Desaparecidos = () => {

  const [desaparecidos, setDesaparecidos] = useState<Desaparecido[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10); // Parametriza a quantidades de cards por página
  const navigate = useNavigate();

  const location = useLocation();

  const [nome, setNome] = useState(location.state?.nome || "");
  const [faixaIdadeInicial, setIdadeMin] = useState(location.state?.faixaIdadeInicial || "");
  const [faixaIdadeFinal, setIdadeMax] = useState(location.state?.faixaIdadeFinal || "");
  const [sexo, setSexo] = useState(location.state?.sexo || "");
  const [status, setStatus] = useState(location.state?.status || "");
  

  useEffect(() => {
    const obterDesaparecidos = async () => {
      const dados = await buscarDesaparecidos();
      setDesaparecidos(dados);
    };
    
    obterDesaparecidos();

    // Se houver filtros salvos no state, aciona a pesquisa automaticamente
    if (location.state) {
      handlePesquisar();
    }
  }, [location.state]);

  const handlePesquisar = async () => {
    try {
      const filtros = {
        nome: nome,
        ffaixaIdadeInicial: faixaIdadeInicial ? Number(faixaIdadeInicial) : undefined,
        faixaIdadeFinal: faixaIdadeFinal ? Number(faixaIdadeFinal) : undefined,
        sexo: sexo as "MASCULINO" | "FEMININO" | undefined,
        status: status as "DESAPARECIDO" | "LOCALIZADO" | undefined,
      };

      const dadosFiltrados = await buscarDesaparecidosComFiltro(filtros);
      setDesaparecidos(dadosFiltrados);
      setPaginaAtual(1); 
    } catch (error) {
      console.error("Erro ao buscar desaparecidos com filtro:", error);
    }
  };

  const handleDetalhesClick = async (id: number) => {
    try {
      const detalhes = await buscarDetalheDesaparecido(id);
      navigate(`/detalhes/${id}`, { state: { detalhes, nome, faixaIdadeInicial, faixaIdadeFinal, sexo, status } });
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    }
  };

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const desaparecidosPaginados = desaparecidos.slice(indicePrimeiroItem, indiceUltimoItem);

  const totalPaginas = Math.ceil(desaparecidos.length / itensPorPagina);

  return (
    <div className="p-10">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-lg md:text-xl font-bold text-white mb-4 bg-azul-1 p-1 text-center uppercase">
          Filtros
        </h1>
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Nome */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nome</label>
            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Faixa Etária */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Faixa Etária</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Idade mínima"
                value={faixaIdadeInicial}
                onChange={(e) => setIdadeMin(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Idade máxima"
                value={faixaIdadeFinal}
                onChange={(e) => setIdadeMax(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Sexo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Sexo</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </select>
          </div>
          {/* Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              <option value="DESAPARECIDO">Desaparecido</option>
              <option value="LOCALIZADO">Localizado</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="button"
              onClick={handlePesquisar}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <h1 className="text-lg md:text-xl font-bold text-white bg-azul-1 p-1 text-center uppercase">
        Pessoas Desaparecidas
      </h1>

     {desaparecidosPaginados.length < 1 ?
      <p className="mt-5 text-center text-lg font-bold text-red-500">Nenhuma informação encontrada!</p> : 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-cinza p-4">
        {desaparecidosPaginados.map((desaparecido) => (
          <div
            key={desaparecido.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg hover-card transition"
            onClick={() => handleDetalhesClick(desaparecido.id)}
          >
            <FotoPessoa 
              url={desaparecido.urlFoto}
              alt={desaparecido.nome}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold uppercase">{desaparecido.nome}</h2>
            <h2 className={`text-lg font-semibold uppercase ${desaparecido.ultimaOcorrencia.dataLocalizacao === null ? "text-red-600": "text-green-600"}`}>{desaparecido.ultimaOcorrencia.dataLocalizacao === null ? "Desaparecido": "Localizado"}</h2>
            <p>{desaparecido.idade} anos</p>
            <p className={"mt-1 font-bold"}>
              Local desaparecimento:
            </p>
            <p className="font-semibold">{desaparecido.ultimaOcorrencia.localDesaparecimentoConcat}</p>
          </div>
        ))}
      </div>
     }

      <p className="text-lg font-bold text-gray-700 mt-4 text-azul-4">
        Total encontrados: {desaparecidos.length}
      </p>

      {/* Paginação */}
      <div className="flex items-center mt-6 space-x-2">
        <button
          className={`px-4 py-2 rounded-l-md transition cursor-pointer ${
            paginaAtual === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          Anterior
        </button>

        <span className="px-4 py-2 text-sm font-semibold">
          Página {paginaAtual} de {totalPaginas}
        </span>

        <button
          className={`px-4 py-2 rounded-r-md transition cursor-pointer ${
            paginaAtual >= totalPaginas || desaparecidos.length <= itensPorPagina
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={paginaAtual >= totalPaginas || desaparecidos.length <= itensPorPagina}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}

export default Desaparecidos

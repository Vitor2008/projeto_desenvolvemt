import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { DesaparecidosController } from "../../Controllers/DesaparecidosController"
import './Desaparecidos.css'
import Button from "../Button/Button"
import LoaderSecondary from "../LoaderSecondary/LoaderSecondary"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSearch, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import CardDesaparecidos from "../CardDesaparecidos/CardDesaparecidos"

interface DadosDesaparecidos {
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

  const [desaparecidos, setDesaparecidos] = useState<DadosDesaparecidos[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10);
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const location = useLocation();

  const [nome, setNome] = useState(location.state?.nome || "");
  const [faixaIdadeInicial, setIdadeMin] = useState(location.state?.faixaIdadeInicial || "");
  const [faixaIdadeFinal, setIdadeMax] = useState(location.state?.faixaIdadeFinal || "");
  const [sexo, setSexo] = useState(location.state?.sexo || "");
  const [status, setStatus] = useState(location.state?.status || "");

  useEffect(() => {
    const obterDesaparecidos = async () => {
      setLoading(true)
      setErro(null)
      try {
        const dados = await DesaparecidosController.listarTodos();
        if (!dados.ok) throw new Error("Erro ao buscar dados. Tente novamente mais tarde.")
        setDesaparecidos(dados);
      } catch (error) {
        console.error("error:", error);
        setErro("Falha ao buscar as informações. Tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    };

    obterDesaparecidos();

    // Se houver filtros salvos no state, aciona a pesquisa automaticamente
    if (location.state) {
      handlePesquisar();
    }
  }, [location.state]);

  const handlePesquisar = async () => {
    setLoading(true)
    setErro(null)
    try {
      const filtros = {
        nome: nome,
        ffaixaIdadeInicial: faixaIdadeInicial ? Number(faixaIdadeInicial) : undefined,
        faixaIdadeFinal: faixaIdadeFinal ? Number(faixaIdadeFinal) : undefined,
        sexo: sexo as "MASCULINO" | "FEMININO" | undefined,
        status: status as "DESAPARECIDO" | "LOCALIZADO" | undefined,
      };
      const dadosFiltrados = await DesaparecidosController.listarComFiltro(filtros);
      if (!dadosFiltrados.ok) throw new Error("Erro ao buscar dados. Tente novamente mais tarde.")
      setDesaparecidos(dadosFiltrados);
      setPaginaAtual(1);
    } catch (error) {
      console.error("error:", error);
      setErro("Falha ao buscar as informações. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
    }
  };

  const handleDetalhesClick = async (id: number) => {
    setLoading(true)
    setErro(null)
    try {
      const detalhes = await DesaparecidosController.obterDetalhes(id);
      if (!detalhes.ok) {
        throw new Error("Erro ao buscar dados. Tente novamente mais tarde.")
      }
      else {
        navigate(`/detalhes/${id}`, { state: { detalhes, nome, faixaIdadeInicial, faixaIdadeFinal, sexo, status } });
      }
    } catch (error) {
      console.error("error", error);
      setErro("Falha ao buscar as informações. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
    }
  };

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const desaparecidosPaginados = desaparecidos.slice(indicePrimeiroItem, indiceUltimoItem);

  //const totalPaginas = Math.ceil(desaparecidos.length / itensPorPagina);

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const reset = () => {
    setNome('');
    setIdadeMin('');
    setIdadeMax('');
    setSexo('');
    setStatus('');
  };

  return (
    <div className="desaparecidos mb-5">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex gap-2">
          <div className="flex items-center justify-center w-full p-5 container-filtros">

            <div className={`rounded-lg bg-gray-200 p-5 w-full ${showFilters ? "expandido" : ""}`}>

              <form>

                {/* Nome */}
                <div className="flex">
                  <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                      <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                    </svg>
                  </div>
                  <input
                    className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                    type="text"
                    placeholder="Busque pelo nome..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <div className="flex gap-4 btn-card">
                    <div className="no-mobile">
                      <Button
                        text="Buscar"
                        type='button'
                        onClick={handlePesquisar}
                        icon={faSearch}
                        color='bg-color-primary'
                      />
                    </div>
                    <Button text="Filtros" icon={faFilter} color='bg-color-secondary' onClick={toggleFilters} />
                  </div>
                </div>


                {showFilters && (
                  <div className='filtros-avancados mt-4 transition-all duration-300'>
                    <div className='flex gap-4 items-center flex-wrap'>

                      {/* Faixa Etária */}
                      <div className='flex flex-col'>
                        <label className='font-semibold'>Idade Mínima</label>
                        <input
                          className='bg-white pl-2 text-base outline-0'
                          type='number'
                          placeholder='Ex: 18'
                          value={faixaIdadeInicial}
                          onChange={(e) => setIdadeMin(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label className='font-semibold'>Idade Máxima</label>
                        <input
                          className='bg-white pl-2 text-base outline-0'
                          placeholder='Ex: 18'
                          type='number'
                          value={faixaIdadeFinal}
                          onChange={(e) => setIdadeMax(e.target.value)}
                        />
                      </div>

                      {/* Sexo */}
                      <div className='flex flex-col'>
                        <label className='font-semibold'>Sexo</label>
                        <select
                          className='bg-white pl-2 text-base outline-0'
                          value={sexo}
                          onChange={(e) => setSexo(e.target.value)}
                        >
                          <option className="classe" value="">Selecione o sexo</option>
                          <option value="MASCULINO">Masculino</option>
                          <option value="FEMININO">Feminino</option>
                        </select>
                      </div>

                      {/* Status */}
                      <div className='flex flex-col'>
                        <label className='font-semibold'>Status</label>
                        <select
                          className='bg-white pl-2 text-base outline-0'
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Selecione o status</option>
                          <option value="DESAPARECIDO">Desaparecida</option>
                          <option value="LOCALIZADO">Localizada</option>
                        </select>
                      </div>
                      <div className="no-desktop">
                        <Button
                          text="Buscar"
                          type='button'
                          onClick={handlePesquisar}
                          icon={faSearch}
                          color='bg-color-primary'
                        />
                      </div>
                      <Button onClick={reset} text="Limpar Filtros" icon={faTrash} color='bg-color-secondary' />
                    </div>
                  </div>
                )
                }
              </form>

            </div>

          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className='text-2xl font-bold text-foreground mb-5'>Pessoas Desaparecidas</h1>
        {loading ? (
          <LoaderSecondary />
        ) : erro ? (
          <p className="flex items-center md:justify-center gap-1 text-lg font-bold">
            <FontAwesomeIcon className="text-error" icon={faTriangleExclamation} />
            {erro}
          </p>
        ) : desaparecidosPaginados.length < 1 ? (
          <p className="flex items-center md:justify-center gap-1 text-lg font-bold">
            <FontAwesomeIcon className="color-primary" icon={faTriangleExclamation} />
            Nenhuma informação encontrada!
          </p>
        ) : (
          <div className="container-desaparecidos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {desaparecidosPaginados.map((desaparecido) => (
              <div
                key={desaparecido.id}
                onClick={() => handleDetalhesClick(desaparecido.id)}>
                <CardDesaparecidos
                  id={desaparecido.id}
                  img={desaparecido.urlFoto}
                  nome={desaparecido.nome}
                  status={desaparecido.ultimaOcorrencia.dataLocalizacao === null ? "Desaparecida" : "Localizada"}
                  idade={desaparecido.idade}
                  data='01/01/2001'
                  local={desaparecido.ultimaOcorrencia.localDesaparecimentoConcat} />
              </div>
            ))}
          </div>
        )}

        {/* TESTE CARD */}
        {/* <div
          key={2}
          onClick={() => handleDetalhesClick(2)}>
          <CardDesaparecidos
            id={2}
            img={'https://tse3.mm.bing.net/th/id/OIP.W3jTWclxgQXMkZCMyldX1wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'}
            nome={'Nome Desaparecido'}
            status={"Desaparecida"}
            idade={20}
            data='01/01/2001'
            local={'Cuiabá, MT'} />
        </div> */}
      </div>

    </div>
  )
}

export default Desaparecidos

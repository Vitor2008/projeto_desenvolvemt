import './Detalhes.css'
import Button from "../Button/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket, faDownload, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useLocation } from "react-router-dom";
import { formatarData } from "../../Helper/FormatarData";
import FotoPessoa from '../../Helper/FotoPessoa';
import { DesaparecidosController } from "../../Controllers/DesaparecidosController"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import type { SweetAlertResult } from "sweetalert2"


const Detalhes = () => {

    const location = useLocation();
    const filtros = location.state || {};
    const detalhes = location.state?.detalhes;

    if (!detalhes) {
        return <div className="p-4 text-red-500">Nenhuma informação encontrada!</div>;
    }

    const dtDesaparecimento = formatarData(detalhes.ultimaOcorrencia.dtDesaparecimento);
    const dtLocalizacao = formatarData(detalhes.ultimaOcorrencia.dataLocalizacao);
    const hoje = new Date().toISOString().split('T')[0];

    const abrirModal = () => {
        const modalContent = document.createElement("div");
        modalContent.innerHTML = `
        <div class="grid grid-cols-1 gap-4 text-left">
            <div>
            <label class="block font-medium text-gray-700"><strong>Informações:*</strong></label>
            <textarea id="campoInfo" class="swal2-textarea border rounded-md p-1 m-0" placeholder="Digite as informações aqui..."></textarea>
            <p id="erroInfo" class="text-red-500 text-sm hidden">Campo obrigatório!</p>
            </div>
            <div class="grid grid-cols-2">
            <div>
                <label class="block font-medium text-gray-700">Data informação:*</label>
                <input type="date" id="campoData" class="swal2-input w-full border rounded-md p-2 m-0 cursor-pointer" max=${hoje}>
                <p id="erroData" class="text-red-500 text-sm hidden">Campo obrigatório!</p>
            </div>
            <div>
                <label class="block font-medium text-gray-700">Enviar foto:</label>
                <input type="file" id="campoFoto" accept="image/png, image/jpeg, image/jpg" class="border rounded-md p-2 w-full cursor-pointer">
                <div id="previewContainer" class="mt-2 hidden">
                <img id="previewImage" class="max-w-full h-auto rounded-md shadow-md"/>
                </div>
            </div>
            </div>
        </div>
        `;

        Swal.fire({
            title: "Enviar informações:",
            showCancelButton: true,
            confirmButtonColor: "oklch(0.546 0.245 262.881)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            html: modalContent,
            preConfirm: async () => {
                const info = document.getElementById("campoInfo") as HTMLTextAreaElement;
                const data = document.getElementById("campoData") as HTMLInputElement;
                const erroInfo = document.getElementById("erroInfo") as HTMLElement;
                const erroData = document.getElementById("erroData") as HTMLElement;
                const campoFoto = document.getElementById("campoFoto") as HTMLInputElement;

                let valid = true;
                let anexos: File[] = [];

                if (!info.value.trim()) {
                    erroInfo.classList.remove("hidden");
                    valid = false;
                } else {
                    erroInfo.classList.add("hidden");
                }

                if (!data.value.trim()) {
                    erroData.classList.remove("hidden");
                    valid = false;
                } else {
                    erroData.classList.add("hidden");
                }

                if (campoFoto.files && campoFoto.files.length > 0) {
                    anexos = Array.from(campoFoto.files);
                }

                if (!valid) return false;

                const dados = {
                    informacao: info.value.trim(),
                    data: data.value.trim(),
                    ocoId: detalhes.ultimaOcorrencia.ocoId,
                    id: detalhes.id,
                    anexos: anexos,
                };

                const result = await DesaparecidosController.enviarInformacoes(dados);

                if (!result || result.erro) {
                    Swal.fire({
                        title: "Erro ao enviar informações!",
                        text: result?.erro || "Ocorreu um erro desconhecido.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                    return false;
                }

                return true;
            }
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Informações Enviadas!",
                    confirmButtonColor: "oklch(0.546 0.245 262.881)",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="detalhes p-5">
            <Link to="/" state={filtros} className='btn-voltar'>
                <Button text="Voltar" icon={faArrowLeft} color='bg-color-secondary' />
            </Link>

            <div className="h-1 bg-color-primary  w-[80vw] lg:mx-40 mx-9 rounded-full  justify-center items-center mt-4 hidden lg:flex">
                <div className="bg-color-primary rounded-full w-fit text-white p-2 px-8 font-bold text-xl">
                    Detalhes da Pessoa
                </div>
            </div>

            <div className='info flex flex-col md:flex-row items-center justify-between p-4 mt-4'>

                <div className='container-info'>
                    <div className='header-detalhes'>
                        <h1 className="text-2xl font-bold mb-1">{detalhes.nome}</h1>
                        <h1 className="font-semibold uppercase mt-4 mb-2"><strong>Última Ocorrência: </strong></h1>
                    </div>
                    <div className='body-detalhes grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                        <div className='col-detalhes'>
                            <label className="block"><strong>Status:</strong></label>
                            <span className={`span-status ${detalhes.ultimaOcorrencia.dataLocalizacao === null ? 'span-desaparecido' : 'span-encontrato'}`}><FontAwesomeIcon icon={detalhes.ultimaOcorrencia.dataLocalizacao === null ? faCircleExclamation : faCircleCheck} className='mr-1' /> {detalhes.ultimaOcorrencia.dataLocalizacao === null ? "Desaparecida" : "Localizada"}</span>
                        </div>
                        <div className='col-detalhes'>
                            <label className="block"><strong>Idade:</strong></label>
                            <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={detalhes.idade + ' anos'} disabled />
                        </div>
                        <div className='col-detalhes'>
                            <label className="block"><strong>Sexo:</strong></label>
                            <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={detalhes.sexo} disabled />
                        </div>
                        <div className='col-detalhes'>
                            <label className="block"><strong>Data desaparecimento:</strong></label>
                            <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={dtDesaparecimento} disabled />
                        </div>
                        <div className='col-detalhes'>
                            <label className="block"><strong>Local desaparecimento:</strong></label>
                            <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={detalhes.ultimaOcorrencia.localDesaparecimentoConcat} disabled />
                        </div>
                        {detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO != null && (
                            <>
                                <div className="col-detalhes">
                                    <label className="block"><strong>Vestimentas desaparecido:</strong></label>
                                    <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido != null &&
                                        detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido != "" ? detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido
                                        : "Não informado"
                                    } disabled />
                                </div>
                                <div className="col-detalhes">
                                    <label className="block"><strong>Últimas informações:</strong></label>
                                    <textarea className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={
                                        detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao != null &&
                                            detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao != "" ? detalhes.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao
                                            : "Sem informações"
                                    } disabled />
                                </div>
                                <div className='col-detalhes flex items-center mt-4'>
                                    <Button text="Enviar Informações" icon={faArrowUpFromBracket} onClick={abrirModal} color='bg-color-primary' />
                                </div>
                            </>
                        )}
                        {detalhes.ultimaOcorrencia.dataLocalizacao != null && (
                            <>
                                <div className='col-detalhes'>
                                    <label className="block"><strong>Data localização:</strong></label>
                                    <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300 font-semibold uppercase" value={dtLocalizacao} disabled />
                                </div>
                                <div className='col-detalhes'>
                                    <label className="block"><strong>Encontrada vivo:</strong></label>
                                    <input type="text" className="w-full text-sm rounded-md py-1 px-2 shadow-sm border border-gray-300" value={detalhes.ultimaOcorrencia.encontradoVivo ? "Sim" : "Não"} disabled />
                                </div>
                            </>
                        )}
                        {detalhes.ultimaOcorrencia.listaCartaz.length > 0 && (
                            <div className='col-detalhes cartaz'>
                                <Button text="Ver Cartaz" icon={faDownload} typeBtn='ahref' href={detalhes.ultimaOcorrencia.listaCartaz[0].urlCartaz} color='bg-color-secondary' />
                            </div>
                        )}
                    </div>
                    <div className='footer-detalhes'>

                    </div>
                </div>

                <div className='img-detalhe'>
                    <FotoPessoa
                        url={detalhes.urlFoto}
                        alt={detalhes.nome}
                        className="object-cover rounded-md mb-4"
                    />
                </div>
            </div>

        </div>
    )
}

export default Detalhes
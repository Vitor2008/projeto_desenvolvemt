import React from 'react'
import { useNavigate } from "react-router-dom";
import './CardDesaparecidos.css'
import Button from '../Button/Button'
import FotoPessoa from '../../Helper/FotoPessoa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faLocationDot, faCircleExclamation, faEye } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

interface DadosDesaparecido {
    id: number;
    img: string;
    nome: string;
    status: string;
    idade: number;
    data: string;
    local: string;
}


const CardDesaparecidos: React.FC<DadosDesaparecido> = ({ id, img, nome, status, idade, data, local }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detalhes/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            key={id}
            className='card-desaparecidos border'>
            <div className='flex flex-col gap-1'>
                <FotoPessoa url={img} alt={nome} />
                <h2 className='font-bold  text-black mt-2 mb-2 text-balance'>{nome}</h2>
                <span className={`span-status ${status == 'Desaparecida' ? 'span-desaparecido' : 'span-encontrato'}`}><FontAwesomeIcon icon={status == 'Desaparecida' ? faCircleExclamation : faCircleCheck} className='mr-1' /> {status}</span>
                <span><strong>Idade: </strong> {idade < 1 ? 'Não informado' : idade + ` anos`} </span>
                <span><FontAwesomeIcon icon={faCalendarWeek} /> {data}</span>
                <span><FontAwesomeIcon icon={faLocationDot} /> {local}</span>
                <div className='btn-card mt-3'>
                    <Button text='Ver Detalhes' icon={faEye} color='bg-color-primary' onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}

export default CardDesaparecidos
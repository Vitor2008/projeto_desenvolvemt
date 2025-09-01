import React from 'react'
import { useNavigate } from "react-router-dom";
import './CardDesaparecidos.css'
import Button from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faLocationDot, faCircleExclamation, faEye } from '@fortawesome/free-solid-svg-icons';

interface DadosDesaparecido {
    id: string;
    img: string;
    nome: string;
    status: string;
    data: string;
    local: string;
}


const CardDesaparecidos: React.FC<DadosDesaparecido> = ({ id, img, nome, status, data, local }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detalhes/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className='card-desaparecidos border' id={id}>
            <div className='flex flex-col gap-1'>
                <img src={img} alt={nome} />
                <h2 className='font-bold text-lg text-black mt-2 mb-2 text-balance'>{nome}</h2>
                <span className={`span-status ${status == 'Desaparecida' ? 'span-desaparecido' : 'span-encontrato'}`}><FontAwesomeIcon icon={faCircleExclamation} className='mr-1' /> {status}</span>
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
import React from 'react'
import './CardDesaparecidos.css'
import Button from '../Button/Button'
import img from '../../assets/Img/home.png'

const CardDesaparecidos = () => {
    return (
        <div className='card-desaparecidos border'>
            <div className='flex flex-col gap-1'>
                <img src={img} width={300} alt='' />
                <h2 className='font-bold text-lg text-black mb-2 text-balance'>Nome</h2>
                <span>Status</span>
                <span> 14/01/2024</span>
                <span>Cuiabá-MT</span>
                <Button text='Ver Detalhes' />
            </div>
        </div>
    )
}

export default CardDesaparecidos
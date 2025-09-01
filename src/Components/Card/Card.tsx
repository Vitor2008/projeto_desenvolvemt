import React from 'react'
import './Cad.css'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface TextCard {
    title: string;
    text: string;
    icon: IconDefinition;
}

const Card: React.FC<TextCard> = ({ title, text, icon }) => {
    return (
        <div className="card">
            <div className="content">
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-lg font-bold'>{title}</h1>
                    <FontAwesomeIcon icon={icon} className='text-xl font-bold' />
                </div>
                <p className="text-sm text-muted-foreground text-balance text-left">
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Card
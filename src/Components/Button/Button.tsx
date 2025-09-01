import React from 'react'
import './Button.css'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface TextButton {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    icon: IconDefinition;
    color: string;
}

const Button: React.FC<TextButton> = ({ text, type = 'button', onClick, icon, color }) => {
    return (
        <button className={`button ${color}`} type={type} onClick={onClick}>
            {text}
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

export default Button
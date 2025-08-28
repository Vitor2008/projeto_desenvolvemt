import React from 'react'
import './Button.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TextButton {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const Button: React.FC<TextButton> = ({ text, type = 'button', onClick }) => {
    return (
        <button className="button" type={type} onClick={onClick}>
            {text}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
    )
}

export default Button
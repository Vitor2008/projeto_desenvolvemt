import React from 'react'
import './Title.css'

interface TitleProps {
    subTitle: string;
    title: string;
    classColor: string;
}

const Title: React.FC<TitleProps> = ({ subTitle, title, classColor }) => {
    return (
        <div className={`title ${classColor}`}>
            <p>{subTitle}</p>
            <h2>{title}</h2>
        </div>
    )
}

export default Title
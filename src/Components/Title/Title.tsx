import React from 'react'
import './Title.css'

interface TitleProps {
    subTitle: string;
    title: string;
    classColor: string;
}

const Title: React.FC<TitleProps> = ({ subTitle, title, classColor }) => {
    return (
        <div className='title'>
            <p>{subTitle}</p>
            <h2 className={`${classColor}`}>{title}</h2>
        </div>
    )
}

export default Title
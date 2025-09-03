import React from 'react';
import imgDefault from '../assets/Img/img default.png'

interface FotoPessoaProps {
  url?: string | null;
  alt?: string;
  className?: string;
}

const FotoPessoa: React.FC<FotoPessoaProps> = ({ url, alt = 'Imagem', className = '' }) => {
  const imagemDefault = imgDefault;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null; // evita loop infinito
    e.currentTarget.src = imagemDefault;
  };

  return (
    <img
      src={url || imagemDefault}
      onError={handleError}
      alt={alt}
      className={className}
      loading='lazy'
    />
  );
};

export default FotoPessoa;

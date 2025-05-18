import React from 'react';

import { type ImageListProps } from '../types/types';

import { ImageListWrapper } from './styles';


export const ImageList: React.FC<ImageListProps> = ({
  imageList,
  onDeleteImage,
}) => {
  return (
    <ImageListWrapper>
      {imageList.map((imageData, index) => (
        <li key={index}>
          <div className="image-container">
            <div className="header-item">
              <div>
                <p className="photo-name">
                  <b>{imageData.photoName}</b>
                </p>
                <p className="date-add">
                  <b>Дата добавления: </b>
                  {new Date(imageData.created_at).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <button onClick={() => onDeleteImage(index)}></button>
            </div>
            {imageData.photoUrl ? (
              <img src={imageData.photoUrl} alt={imageData.photoName} />
            ) : (
              <img
                src={imageData.urls?.regular || ''}
                alt={imageData.alt_description || 'Фото'}
              />
            )}

            {imageData.addedFromForm && imageData.description && (
              <p className="photo-description">
                <b>Описание: </b>
                {imageData.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ImageListWrapper>
  );
};

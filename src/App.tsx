import { useEffect, useState } from 'react';
import axios from 'axios';

import { ImageList } from './components/ImageList/ImageList';
import { Form } from './components/Form/Form';
import { AppContainer, Header } from './styles';
import { type FormData, type ImageListItem } from './components/types/types';

function App() {
  const [imageList, setImageList] = useState<ImageListItem[]>(() => {
    const savedImageList = localStorage.getItem('imageList');

    return savedImageList ? JSON.parse(savedImageList) : [];
  });

  const addImageToList = (formData: FormData) => {
    const imageData: ImageListItem = {
      ...formData,
      created_at: new Date().toISOString(),
    };

    const updatedImageList = [...imageList, imageData];

    setImageList(updatedImageList);
    localStorage.setItem('imageList', JSON.stringify(updatedImageList));
  };

  useEffect(() => {
    if (imageList.length === 0) {
      axios
        .get('https://api.unsplash.com/photos', {
          params: {
            client_id: '7qnzebaKrDSaXNTJiynk6fpqfSOmlSmYokqKhYwG3M8',
            per_page: 5,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const unsplashImages = response.data;
            const updatedImageList: ImageListItem[] = unsplashImages.map(
              (image: any) => {
                return {
                  ...image,
                  photoName: image.alt_description || image.location || 'Name',
                  created_at: image.created_at,
                };
              },
            );

            const combinedImageList = [...imageList, ...updatedImageList];

            setImageList(combinedImageList);

            localStorage.setItem(
              'imageList',
              JSON.stringify(combinedImageList),
            );
          } else {
            console.error(
              'Ошибка при загрузке изображений. Статус:',
              response.status,
            );
          }
        })
        .catch((error) => {
          console.error('Ошибка при загрузке изображений:', error);
        });
    }
  }, [imageList]);

  const handleDeleteImage = (index: number) => {
    const updatedImageList = [...imageList];

    updatedImageList.splice(index, 1);
    setImageList(updatedImageList);
    localStorage.setItem('imageList', JSON.stringify(updatedImageList));
  };

  return (
    <AppContainer>
      <Header>
        <h1>Тестовое задание junior with form</h1>
      </Header>
      <main>
        <Form addImageToList={addImageToList} />
        <ImageList imageList={imageList} onDeleteImage={handleDeleteImage} />
      </main>
    </AppContainer>
  );
}

export default App;

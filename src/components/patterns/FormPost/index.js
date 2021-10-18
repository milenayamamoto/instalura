import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { parseCookies } from 'nookies';
import { useSnackbar } from 'react-simple-snackbar';
import Router from 'next/router';
import { LOGIN_COOKIE_APP_TOKEN } from '../../../services/login/loginService';
import { BASE_URL } from '../../../theme/utils/baseUrl';
import { Button } from '../../commons/Button';
import Carousel from '../../commons/Carousel';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import FormPostHeader from './Header';
import FormPostImage from './Image';

// eslint-disable-next-line react/prop-types
export default function FormPost({ propsDoModal }) {
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [choosenFilter, setChoosenFilter] = useState('none');

  const [openSnackbar] = useSnackbar({ position: 'top-center' });

  const isImageValid = image?.match(/\.(jpeg|jpg|gif|png)$/) !== null;

  const handleFilter = (filter) => {
    setChoosenFilter(filter);
  };

  const clearValues = () => {
    setImage(undefined);
    setDescription(undefined);
    setIsFirstStep(true);
    setChoosenFilter('');
  };

  const handlePost = async () => {
    const payload = { photoUrl: image, description, filter: choosenFilter };

    const url = `${BASE_URL}/api/posts`;

    try {
      const cookies = parseCookies();
      const token = cookies[LOGIN_COOKIE_APP_TOKEN];

      await fetch(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
      }).then(async (res) => {
        const resposta = await res.json();
        openSnackbar('Postagem criada com sucesso!');
        Router.reload();
        return resposta.data;
      });
    } catch (err) {
      openSnackbar('Sua post não pode ser criado!');
    }
  };

  const handleImage = (event) => {
    const { value } = event.target;
    setImage(value);
  };

  const handleDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handleClose = () => {
    clearValues();
    // eslint-disable-next-line react/prop-types
    propsDoModal.onClose();
  };

  return (
    <Box
      position="fixed"
      backgroundColor="white"
      top="25%"
      left="40%"
      margin="0 auto"
      width="375px"
      borderRadius="5px"
      {...propsDoModal}
    >
      <FormPostHeader onClose={handleClose} />

      <FormPostImage image={image} filter={choosenFilter} />

      {isFirstStep ? (
        <Box padding="1rem">
          <TextField
            placeholder="URL da imagem"
            name="image"
            value={image}
            onChange={handleImage}
            style={{ marginBottom: 0 }}
          />
          <small>Formatos suportados: jpg, png, svg e xpto.</small>
          <Button
            type="button"
            variant="primary.main"
            onClick={() => setIsFirstStep(!isFirstStep)}
            disabled={!isImageValid}
            fullWidth
          >
            Avançar
          </Button>
        </Box>
      ) : (
        <Box padding="1rem">
          <Carousel onFilter={handleFilter} />
          <span>Descrição</span>
          <TextField
            placeholder="Descrição"
            name="description"
            value={description}
            onChange={handleDescription}
            style={{ marginBottom: 0, padding: '1rem' }}
          />
          <Button
            type="button"
            variant="primary.main"
            onClick={handlePost}
            disabled={isEmpty(description)}
            fullWidth
          >
            Postar
          </Button>
        </Box>
      )}

    </Box>
  );
}

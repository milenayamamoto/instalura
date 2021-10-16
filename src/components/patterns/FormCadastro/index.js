/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'react-simple-snackbar';
import { Lottie } from '@crello/react-lottie';
import errorAnimation from './animations/error.json';
import successAnimation from './animations/success.json';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import { BASE_URL } from '../../../theme/utils/baseUrl';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent({ onClose }) {
  const [openSnackbar] = useSnackbar({ position: 'top-center' });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);

  const [userInfo, setUserInfo] = useState({ usuario: '', nome: '' });
  const isFormInvalid = userInfo.usuario.length === 0 || userInfo.nome.length === 0;

  const handleChange = (event) => {
    const { value } = event.target;
    const fieldName = event.target.getAttribute('name');

    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    const userDTO = {
      username: userInfo.usuario,
      name: userInfo.nome,
    };

    fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDTO),
    })
      .then((respostaDoServidor) => {
        if (respostaDoServidor.ok) {
          return respostaDoServidor.json();
        }

        openSnackbar('Não foi possível cadastrar o usuário agora!');
        throw new Error('Não foi possível cadastrar o usuário agora');
      })
      // eslint-disable-next-line no-unused-vars
      .then(() => {
        setSubmissionStatus(formStates.DONE);
        openSnackbar('Usuário cadastrado com sucesso!');
        onClose();
      })
      .catch((error) => {
        setSubmissionStatus(formStates.ERROR);
        openSnackbar('Erro ao submeter o formulário!');
        // eslint-disable-next-line no-console
        console.error(error);
      });
    // .finally(() => {})
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text variant="title" tag="h1" color="tertiary.main">
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está rolando no bairro, complete
        seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="nome"
          value={userInfo.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          placeholder="Usuário"
          name="usuario"
          value={userInfo.usuario}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="primary.main"
        type="submit"
        disabled={isFormInvalid}
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmitted && submissionStatus === formStates.DONE
      && (
        <Box display="flex" justifyContent="center">
          <Lottie
            width="150px"
            height="150px"
            config={{ animationData: successAnimation, loop: true, autoplay: true }}
          />
        </Box>
      )}

      {isFormSubmitted && submissionStatus === formStates.ERROR
      && (
      <Box display="flex" justifyContent="center">
        <Lottie
          width="150px"
          height="150px"
          config={{ animationData: errorAnimation, loop: true, autoplay: true }}
        />
      </Box>
      )}

    </form>
  );
}

FormContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function FormCadastro({ propsDoModal }) {
  return (
    <Grid.Row marginLeft={0} marginRight={0} flex={1} justifyContent="flex-end">
      <Grid.Col
        display="flex"
        flexDirection="column"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
        backgroundColor="white"
        boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="tertiary.light"
            fontSize="30px"
            // eslint-disable-next-line react/prop-types
            onClick={propsDoModal.onClose}
            ghost
          >
            ✕
          </Button>
        </div>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          {...propsDoModal}
        >
          <FormContent onClose={propsDoModal.onClose} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

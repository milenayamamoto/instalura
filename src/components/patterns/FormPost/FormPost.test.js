import React from 'react';
import user from '@testing-library/user-event';
import FormPost from './index';
import {
  render, act, screen, waitFor,
} from '../../../infra/test/testUtils';

const onSubmit = jest.fn();
onSubmit.mockImplementation((event) => {
  event.preventDefault();
});

describe('<FormPost />', () => {
  describe('when form fields are valid', () => {
    test('complete the submission', async () => {
      await act(async () => render(<FormPost />));

      const inputImageUrl = screen.getByPlaceholderText('URL da imagem');
      user.type(
        inputImageUrl,
        'http://testedaimagemcomextensaovalida.com.br/imagemurlteste.jpg',
      );
      await waitFor(() => expect(inputImageUrl).toHaveValue(
        'http://testedaimagemcomextensaovalida.com.br/imagemurlteste.jpg',
      ));

      const nextButton = document.getElementById('next');
      expect(nextButton).not.toBeDisabled();
      nextButton.click();

      const inputDescricao = screen.getByPlaceholderText('Descrição');
      user.type(inputDescricao, 'Teste de imagem');
      await waitFor(() => expect(inputDescricao).toHaveValue('Teste de imagem'));

      const postButton = document.getElementById('post');
      expect(postButton).not.toBeDisabled();
      postButton.click();
    });
  });
});

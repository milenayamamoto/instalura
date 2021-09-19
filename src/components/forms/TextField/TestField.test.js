import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '../../../infra/test/testUtils';
import TextField from './index';

describe('<TextField />', () => {
  test('renders components', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Teste"
        onChange={() => {}}
        name="nome"
      />,
    );

    screen.debug();

    const textField = screen.getByPlaceholderText(/nome/i);

    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();

        render(
          <TextField
            placeholder="Nome"
            value="Teste"
            onChange={onChangeMock}
            name="nome"
            isTouched
          />,
        );

        const inputNome = screen.getByPlaceholderText(/nome/i);
        user.type(inputNome, 'teste@gmail.com');

        expect(onChangeMock).toHaveBeenCalledTimes(15);
      });
    });
  });

  describe('when field is invalid', () => {
    test('display the respective error message', () => {
      render(
        <TextField
          placeholder="Email"
          value="teste@gmail.com"
          onChange={() => {}}
          name="email"
          error="O campo email é obrigatório"
          isTouched
        />,
      );

      const inputEmail = screen.getByPlaceholderText(/email/i);

      expect(inputEmail).toHaveValue('teste@gmail.com');
      expect(screen.getByRole('alert')).toHaveTextContent(
        'O campo email é obrigatório',
      );
      expect(inputEmail).toMatchSnapshot();
    });
  });
});

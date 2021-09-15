import React from 'react';
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
});

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../../../theme/Logo';
import { Button } from '../Button';
import { MenuWrapper } from './styles/MenuWrapper';
import TextField from '../../forms/TextField';
import Link from '../Link';

export default function Menu({ user }) {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <MenuWrapper
      className="menu-wrapper"
      style={{ borderBottom: '1px solid #D5D5D5' }}
    >
      <MenuWrapper.LeftSide>
        <Link href="/app/profile" color="secondary.main">
          <Logo />
        </Link>
      </MenuWrapper.LeftSide>
      <MenuWrapper.RightSide>
        <TextField
          placeholder="Pesquisar"
          name="search"
          value={search}
          onChange={handleSearch}
          style={{ marginBottom: 0 }}
        />
        <Button
          type="img"
          ghost
          variant="secondary.main"
          className="rotate-button"
        >
          <img src="/images/postIcon.svg" alt="Ícone de criar nova postagem" />
        </Button>
        <Button
          type="img"
          ghost
          variant="secondary.main"
          className="rotate-button"
        >
          <img src="/images/home.svg" alt="Ícone de home" />
        </Button>
        <Button
          type="img"
          ghost
          variant="secondary.main"
          className="rotate-button"
        >
          <img src="/images/heart.svg" alt="Ícone de curtida" />
        </Button>
        <Button type="img" ghost variant="secondary.main">
          <img
            src={`https://github.com/${user?.username}.png`}
            alt="Foto de perfil"
            style={{ borderRadius: '50%', width: '40px' }}
          />
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}

Menu.defaultProps = {
  user: {},
};

Menu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

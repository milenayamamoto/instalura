import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import PropTypes from 'prop-types';
import { Logo } from '../../../theme/Logo';
import { Button } from '../Button';
import { MenuWrapper } from './styles/MenuWrapper';
import TextField from '../../forms/TextField';
import Link from '../Link';
import { LOGIN_COOKIE_APP_TOKEN } from '../../../services/login/loginService';

export default function Menu({ user, onChangeModal }) {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleClick = () => {
    onChangeModal();
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleLogout = () => {
    destroyCookie(null, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
    router.push('/');
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
          variant="secondary.main"
          className="rotate-button"
          onClick={handleClick}
          ghost
        >
          <img src="/images/postIcon.svg" alt="Ícone de criar nova postagem" />
        </Button>
        <Button
          type="a"
          variant="secondary.main"
          className="rotate-button"
          href="/app/profile"
          ghost
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
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {/* //TODO: filters posts with likes */}
        </Button>
        <Button type="img" ghost variant="secondary.main" href="/app/logged">
          <img
            src={`https://github.com/${user?.username}.png`}
            alt="Foto de perfil"
            style={{ borderRadius: '50%', width: '40px' }}
          />
        </Button>
        <Button
          type="a"
          variant="secondary.main"
          className="rotate-button"
          onClick={handleLogout}
          ghost
        >
          <img src="/images/logout.svg" alt="Ícone de logout" />
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
  onChangeModal: PropTypes.func.isRequired,
};

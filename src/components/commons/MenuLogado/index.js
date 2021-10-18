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

export default function MenuLogado({
  user,
  onChangeModal,
  onFilterByLikedPosts,
  onSearch,
}) {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleClick = () => {
    onChangeModal();
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleTerm = () => {
    onSearch(search);
  };

  const handleLogout = () => {
    destroyCookie(null, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
    router.push('/');
  };

  return (
    <>
      <MenuWrapper
        className="menu-wrapper"
        style={{ borderBottom: '1px solid #D5D5D5' }}
        display={{ xs: 'none', md: 'inherit' }}
      >
        <MenuWrapper.LeftSide>
          <Link href="/app/profile" color="secondary.main">
            <Logo />
          </Link>
        </MenuWrapper.LeftSide>
        <MenuWrapper.RightSide>
          <span style={{ position: 'relative' }}>
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
              ghost
              style={{ position: 'absolute', right: 0, top: 0 }}
              onClick={handleTerm}
            >
              <img src="/images/search.svg" alt="Ícone de pesquisar" />
            </Button>
          </span>
          <Button
            type="img"
            variant="secondary.main"
            className="rotate-button"
            onClick={handleClick}
            ghost
          >
            <img
              src="/images/postIcon.svg"
              alt="Ícone de criar nova postagem"
            />
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
            onClick={onFilterByLikedPosts}
          >
            <img src="/images/heart.svg" alt="Ícone de curtida" />
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

      {/* Header mobile */}
      <MenuWrapper
        className="menu-wrapper"
        display={{ xs: 'inherit', md: 'none' }}
        style={{
          borderBottom: '1px solid #D5D5D5',
          height: '48px',
          backgroundColor: '#F2F2F2',
          width: '100%',
        }}
      >
        <Link
          href="/app/profile"
          color="secondary.main"
          style={{ margin: 'auto' }}
        >
          <Logo />
        </Link>
      </MenuWrapper>

      {/* Footer mobile */}
      <MenuWrapper
        className="menu-wrapper"
        display={{ xs: 'inherit', md: 'none' }}
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.04)',
          borderRadius: '24px 24px 0px 0px',
          height: '64px',
          zIndex: '1',
        }}
      >
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
          variant="secondary.main"
          ghost
        >
          <img src="/images/search.svg" alt="Ícone de pesquisar" />
        </Button>
        <Button
          type="img"
          variant="secondary.main"
          className="rotate-button"
          onClick={handleClick}
          ghost
        >
          <img
            src="/images/postIcon.svg"
            alt="Ícone de criar nova postagem"
          />
        </Button>
        <Button
          type="img"
          ghost
          variant="secondary.main"
          className="rotate-button"
          onClick={onFilterByLikedPosts}
        >
          <img src="/images/heart.svg" alt="Ícone de curtida" />
        </Button>
        <Button type="img" ghost variant="secondary.main" href="/app/logged">
          <img
            src={`https://github.com/${user?.username}.png`}
            alt="Foto de perfil"
            style={{ borderRadius: '50%', width: '40px' }}
          />
        </Button>
      </MenuWrapper>
    </>
  );
}

MenuLogado.defaultProps = {
  user: {},
};

MenuLogado.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  onChangeModal: PropTypes.func.isRequired,
  onFilterByLikedPosts: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

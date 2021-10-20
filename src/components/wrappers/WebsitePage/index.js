/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Footer from '../../commons/Footer';
import Menu from '../../commons/Menu';
import MenuLogado from '../../commons/MenuLogado';
import Modal from '../../commons/Modal';
import { Box } from '../../foundation/layout/Box';
import FormCadastro from '../../patterns/FormCadastro';
import SEO from '../../commons/SEO';
import {
  useUserService,
  useGetUserGithubByName,
} from '../../../services/user/hook';

import { WebsitePageContext } from './context';
import FormPost from '../../patterns/FormPost';

export { WebsitePageContext } from './context';
export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  messages,
}) {
  const [isModalOpen, setModalState] = useState(false);
  const [isModalNewPostOpen, setModalNewPostOpen] = useState(false);

  const [hasFilterByLikedPosts, setFilterByLikedPosts] = useState(false);
  const [search, setSearch] = useState('');

  const { posts, user, users } = useUserService.getProfilePage();
  const { githubUser } = useGetUserGithubByName.getGithubProfile(user?.username);

  const handleLikeFilter = () => {
    setFilterByLikedPosts(!hasFilterByLikedPosts);
  };

  const handleSearch = (term) => {
    setSearch(term);
  };

  return (
    <WebsitePageContext.Provider
      value={{
        toggleModalCadastro: () => {
          setModalState(!isModalOpen);
        },
        getCMSContent: (cmsKey) => get(messages, cmsKey),
        posts,
        user,
        users,
        githubUser,
        hasFilterByLikedPosts,
        search,
      }}
    >
      <SEO {...seoProps} />

      <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalState(false);
          }}
        >
          {(propsDoModal) => <FormCadastro propsDoModal={propsDoModal} />}
        </Modal>
        <Modal
          isOpen={isModalNewPostOpen}
          onClose={() => {
            setModalNewPostOpen(false);
          }}
        >
          {(propsDoModal) => <FormPost propsDoModal={propsDoModal} />}
        </Modal>
        {!isEmpty(user) ? (
          <MenuLogado
            user={user}
            onChangeModal={() => setModalNewPostOpen(!isModalNewPostOpen)}
            onFilterByLikedPosts={handleLikeFilter}
            onSearch={handleSearch}
          />
        ) : (
          menuProps.display && (
            <Menu onCadastrarClick={() => setModalState(true)} />
          )
        )}
        {children}
        {isEmpty(user) && <Footer />}
      </Box>
    </WebsitePageContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
  messages: {},
};

WebsitePageWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.object,
};

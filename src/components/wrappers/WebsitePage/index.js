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
import { useUserService } from '../../../services/user/hook';

import { WebsitePageContext } from './context';

export { WebsitePageContext } from './context';
export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  messages,
}) {
  const [isModalOpen, setModalState] = useState(false);

  const { posts, user } = useUserService.getProfilePage();

  return (
    <WebsitePageContext.Provider
      value={{
        toggleModalCadastro: () => {
          setModalState(!isModalOpen);
        },
        getCMSContent: (cmsKey) => get(messages, cmsKey),
        posts,
        user,
      }}
    >
      <SEO
        {...seoProps}
      />

      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        {...pageBoxProps}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalState(false);
          }}
        >
          {(propsDoModal) => (
            <FormCadastro propsDoModal={propsDoModal} />
          )}
        </Modal>
        {!isEmpty(user) ? <MenuLogado user={user} /> : menuProps.display && (
          <Menu
            onCadastrarClick={() => setModalState(true)}
          />
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

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../commons/Button';
import Text from '../../../foundation/Text';
import { Box } from '../../../foundation/layout/Box';

export default function CardHeader({ post, users }) {
  const postUser = users?.filter((user) => user._id === post.user);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="#FFFFFF"
    >
      <Button
        type="a"
        ghost
        variant="secondary.main"
        href={`https://github.com/${postUser?.[0].username}`}
        display="flex"
        alignItems="center"
        gap="10px"
      >
        <img
          src={`https://github.com/${postUser?.[0].username}.png`}
          alt="Foto de perfil"
          style={{ borderRadius: '50%', width: '40px' }}
        />
        <Text color="tertiary.dark">
          {' '}
          <strong>{postUser?.[0].username}</strong>
        </Text>
      </Button>
      <Button type="a" ghost variant="secondary.main">
        <img src="/images/config.svg" alt="Configurações" />
      </Button>
    </Box>
  );
}

CardHeader.defaultProps = {
  post: {},
  users: [],
};

CardHeader.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array,
};

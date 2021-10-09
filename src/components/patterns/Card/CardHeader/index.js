/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../commons/Button';
import Text from '../../../foundation/Text';
import { useGetUserGithubById } from '../../../../services/user/hook';
import { Box } from '../../../foundation/layout/Box';

export default function CardHeader({ post }) {
  const { githubUser } = useGetUserGithubById.getGithubProfile(post.user);

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
        href={githubUser?.html_url}
        display="flex"
        alignItems="center"
        gap="10px"
      >
        <img
          src={`https://github.com/${githubUser?.login}.png`}
          alt="Foto de perfil"
          style={{ borderRadius: '50%', width: '40px' }}
        />
        <Text color="tertiary.dark">
          {' '}
          <strong>{githubUser?.login}</strong>
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
};

CardHeader.propTypes = {
  post: PropTypes.object,
};

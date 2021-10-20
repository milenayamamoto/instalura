import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import Text from '../../../foundation/Text';
import { Button } from '../../Button';

export default function Profile({ user }) {
  return (
    <Box>
      <Grid.Row
        alignItems="center"
        style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}
      >
        <Grid.Col>
          <Button
            type="a"
            ghost
            variant="secondary.main"
            href={`https://github.com/${user?.username}`}
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <img
              src={`https://github.com/${user?.username}.png`}
              alt="Foto de perfil"
              style={{ borderRadius: '50%', width: '40px' }}
              loading="lazy"
            />
            <Text color="tertiary.dark">
              {' '}
              <strong>{user?.username}</strong>
            </Text>
          </Button>
        </Grid.Col>
        <Grid.Col>
          <Button
            type="a"
            ghost
            variant="secondary.main"
            href={`https://github.com/${user?.username}`}
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <img src="/images/github.svg" alt="Ícone Github" loading="lazy" />
            <Text color="secondary.main">
              {' '}
              <strong>Github</strong>
            </Text>
          </Button>
        </Grid.Col>
      </Grid.Row>
    </Box>
  );
}

Profile.defaultProps = {
  user: {},
};

Profile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import Text from '../../../foundation/Text';
import { Button } from '../../Button';

export default function OtherProjects({ users }) {
  const [randomProfiles, setRandomProfiles] = useState();

  useEffect(() => {
    if (isEmpty(users)) return;

    setRandomProfiles(users.sort(() => 0.5 - Math.random()).slice(0, 5));
  }, [users]);

  const renderProfiles = () => randomProfiles?.map((profile) => (
    <Box>
      <Grid.Row alignItems="center">
        <Grid.Col>
          <Button
            type="a"
            ghost
            variant="secondary.main"
            href="#"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <img
              src={`https://github.com/${profile?.username}.png`}
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/avatar.png'; }}
              alt={`Foto de ${profile.name}`}
              style={{ borderRadius: '50%', width: '40px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text color="tertiary.dark">
                <strong>{profile.username}</strong>
              </Text>
              <Text color="tertiary.light">{profile.name}</Text>
            </div>
          </Button>
        </Grid.Col>
        <Grid.Col>
          <Button
            type="a"
            ghost
            variant="secondary.main"
            href="#"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <img src="/images/github.svg" alt="Ícone Github" />
            <Text color="secondary.main">
              {' '}
              <strong>Github</strong>
            </Text>
          </Button>
        </Grid.Col>
      </Grid.Row>
    </Box>
  ));

  return (
    <Box>
      <div style={{ padding: '1rem' }}>
        <Text color="tertiary.light">
          {' '}
          <strong>Projetos da galera</strong>
        </Text>
      </div>
      {renderProfiles()}
    </Box>
  );
}

OtherProjects.defaultProps = {
  users: {},
};

OtherProjects.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object,
};

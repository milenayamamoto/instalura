import React from 'react';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import Text from '../../../foundation/Text';
import { Button } from '../../Button';

// eslint-disable-next-line spaced-comment
//HARDCODED
export default function OtherProjects() {
  const profiles = [
    {
      img: '/images/john_cena.png',
      name: 'john_cena',
      description: 'IT’S JOHN CENA',
    },
    {
      img: '/images/leeroy_jenkins.png',
      name: 'leeroy.jenkins',
      description: 'Leeroy Jenkins Official',
    },
    {
      img: '/images/ronaldinho_gaucho.png',
      name: 'gauchoronaldinho',
      description: 'Ronaldin Gaúcho',
    },
    {
      img: '/images/wally.png',
      name: 'wally',
      description: 'this time it was easy',
    },
  ];

  const renderProfiles = () => profiles.map((profile) => (
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
              src={profile.img}
              alt={`Foto de ${profile.name}`}
              style={{ borderRadius: '50%', width: '40px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text color="tertiary.dark">
                <strong>{profile.name}</strong>
              </Text>
              <Text color="tertiary.light">{profile.description}</Text>
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

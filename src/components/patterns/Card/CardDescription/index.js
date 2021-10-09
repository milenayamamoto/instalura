/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../commons/Button';
import Text from '../../../foundation/Text';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';

export default function CardDescription({ post }) {
  // eslint-disable-next-line spaced-comment
  const handleLike = () => { //TODO
    // eslint-disable-next-line no-console
    console.log('LIKED!');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="#FFFFFF"
      height="170px"
    >
      <Grid.Container>
        <Grid.Row display="flex" justifyContent="space-between">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="a"
              ghost
              variant="secondary.main"
              onClick={handleLike}
              display="flex"
              alignItems="center"
              gap="10px"
              className="rotate-button"
            >
              <img src="/images/heart.svg" alt="Ícone de curtir" />
            </Button>
            <Text style={{ color: '#000' }}>
              {' '}
              <strong>{post?.likes.length}</strong>
            </Text>
            <Button type="a" ghost variant="secondary.main" className="rotate-button">
              <img src="/images/messages.svg" alt="Ícone de mensagens" />
            </Button>
            <Button type="a" ghost variant="secondary.main" className="rotate-button">
              <img src="/images/send.svg" alt="Ícone de enviar" />
            </Button>
          </div>
          <Button type="a" ghost variant="secondary.main" className="rotate-button">
            <img src="/images/bookmark.svg" alt="Ícone de favoritar" />
          </Button>
        </Grid.Row>
        <Grid.Row
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ padding: '0 26px' }}
        >
          <Text>
            {' '}
            {post?.description}
          </Text>
          <Button type="a" variant="background.secondary">
            Mais
          </Button>
        </Grid.Row>
      </Grid.Container>
    </Box>
  );
}

CardDescription.defaultProps = {
  post: {},
};

CardDescription.propTypes = {
  post: PropTypes.object,
};

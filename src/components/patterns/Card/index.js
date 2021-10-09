/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import { Box } from '../../foundation/layout/Box';
import CardDescription from './CardDescription';

export default function Card({ user, post }) {
  return (
    <Box width="55%" marginBottom="5rem">
      <CardHeader user={user} post={post} />
      <img
        src={post?.photoUrl}
        width="100%"
        alt={post?.description}
      />
      <CardDescription post={post} />
    </Box>
  );
}

Card.defaultProps = {
  user: {},
  post: {},
};

Card.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
};

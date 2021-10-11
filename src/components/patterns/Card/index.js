/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import { Box } from '../../foundation/layout/Box';
import CardDescription from './CardDescription';
import CardImage from './CardImage';

export default function Card({
  post, users, onLike,
}) {
  return (
    <Box width="100%" marginBottom="5rem">
      <CardHeader post={post} users={users} />
      <CardImage post={post} onLike={onLike} />
      <CardDescription post={post} />
    </Box>
  );
}

Card.defaultProps = {
  post: {},
  users: [],
};

Card.propTypes = {
  post: PropTypes.object,
  users: PropTypes.array,
  onLike: PropTypes.func.isRequired,
};

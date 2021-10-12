/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import { Box } from '../../foundation/layout/Box';
import CardDescription from './CardDescription';
import CardImage from './CardImage';

export default function Card({
  user, post, users, onLike,
}) {
  const isLiked = post?.likes.some((like) => like.user === user.id);

  return (
    <Box width="100%" marginBottom="5rem">
      <CardHeader post={post} users={users} />
      <CardImage isLiked={isLiked} post={post} onLike={onLike} />
      <CardDescription isLiked={isLiked} post={post} />
    </Box>
  );
}

Card.defaultProps = {
  user: {},
  post: {},
  users: [],
};

Card.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  users: PropTypes.array,
  onLike: PropTypes.func.isRequired,
};

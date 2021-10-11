/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../commons/Button';

export default function CardImage({ post, onLike }) {
  // const isLiked = post.likes // TODO
  return (
    <Button
      ghost
      onClick={onLike(post._id)}
      style={{ padding: 0, width: '100%' }}
      className="card-container"
    >
      <img src={post?.photoUrl} alt={post?.description} width="100%" className="card-image" />
      <div className="card-overlay">
        <img
          src="/images/heart.svg"
          alt="Ícone de curtida"
          className="card-icon"
        />
      </div>
    </Button>
  );
}

CardImage.defaultProps = {
  post: {},
};

CardImage.propTypes = {
  post: PropTypes.object,
  onLike: PropTypes.func.isRequired,
};

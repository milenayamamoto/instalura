/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import { Button } from '../../../commons/Button';
import likeAnimation from '../animations/like.json';

export default function CardImage({ isLiked, post, onLike }) {
  const [likeButton, setLikeButton] = useState(false);

  const handleLike = (likedPost) => () => {
    setLikeButton(likedPost._id);
    onLike(likedPost);
  };

  return (
    <Button
      ghost
      onClick={handleLike(post)}
      style={{ padding: 0, width: '100%' }}
      className="card-container"
      // disabled={isLiked}
    >
      <img src={post?.photoUrl} alt={post?.description} width="100%" className="card-image" />
      <div className="card-overlay">
        {isLiked && likeButton === post._id ? (
          <Lottie
            width="200px"
            height="200px"
            config={{ animationData: likeAnimation, loop: false, autoplay: true }}
          />
        ) : (
          <img
            src="/images/heart.svg"
            alt="Ícone de curtida"
            className="card-icon"
          />
        )}
      </div>
    </Button>
  );
}

CardImage.defaultProps = {
  post: {},
};

CardImage.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  post: PropTypes.object,
  onLike: PropTypes.func.isRequired,
};

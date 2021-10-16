import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Box } from '../../../foundation/layout/Box';

export default function FormPostImage({ image, filter }) {
  return isEmpty(image) ? (
    <Box
      height="340px"
      background="#D5D5D5 url(/images/no_image.svg) center center no-repeat"
    />
  ) : (
    <img src={image} className={filter} alt="Imagem escolhida para a postagem" style={{ width: 'inherit' }} />
  );
}

FormPostImage.propTypes = {
  image: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../commons/Button';
import { Box } from '../../../foundation/layout/Box';

export default function FormPostHeader({ onClose }) {
  return (
    <Box
      height="56px"
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Button
        type="button"
        variant="tertiary.light"
        fontSize="18px"
        onClick={onClose}
        ghost
      >
        ✕
      </Button>
    </Box>
  );
}

FormPostHeader.defaultProps = {
  onClose: undefined,
};

FormPostHeader.propTypes = {
  onClose: PropTypes.func,
};

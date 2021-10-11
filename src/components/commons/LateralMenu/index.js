/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../foundation/layout/Box';
import OtherProjects from './OtherProjects';
import Profile from './Profile';

export default function LateralMenu({ user, users }) {
  return (
    <Box>
      <Profile user={user} />
      <OtherProjects users={users} />
    </Box>
  );
}

LateralMenu.defaultProps = {
  user: {},
  users: [],
};

LateralMenu.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
};

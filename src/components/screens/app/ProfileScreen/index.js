import React from 'react';
import { Grid } from '../../../foundation/layout/Grid';

export default function ProfileScreen() {
  // console.log({ user, profilePage });

  return (
    <Grid.Container
      flex="1"
      marginTop={{
        xs: '32px',
        md: '80px',
      }}
    >
      Profile
    </Grid.Container>
  );
}

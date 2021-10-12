import React from 'react';
import { authService } from '../../src/services/auth/authService';
import ProfileScreen from '../../src/components/screens/app/ProfileScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function ProfilePage() {
  return <ProfileScreen />;
}

ProfilePage.propTypes = ProfileScreen.propTypes;

export default websitePageHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Timeline',
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    return {
      props: {
        user: {
          ...session,
        },
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}

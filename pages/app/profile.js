import React from 'react';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
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
    isLogged: true,
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    return {
      props: {
        user: {
          ...session,
          // ...profilePage.user,
        },
        isLogged: hasActiveSession,
        profilePage,
        // posts: profilePage.posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}

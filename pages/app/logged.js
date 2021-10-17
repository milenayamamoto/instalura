import React from 'react';
import { authService } from '../../src/services/auth/authService';
import LoggedScreen from '../../src/components/screens/app/LoggedScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function LoggedPage() {
  return <LoggedScreen />;
}

LoggedPage.propTypes = LoggedScreen.propTypes;

export default websitePageHOC(LoggedPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Perfil',
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

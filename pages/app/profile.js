import React from 'react';
import { authService } from '../../src/services/auth/authService';
import { useUserService } from '../../src/services/user/hook';

export default function ProfilePage() {
  const dados = useUserService.getProfilePage();

  // eslint-disable-next-line no-console
  console.log(dados);
  return (
    <div>
      Página de Profile!
      {dados.loading && 'Loading'}
      {!dados.loading && dados.data && 'Carregou com sucesso!'}
      {!dados.loading && dados.error}
      {/* <pre>
        {JSON.stringify(props, null, 4)}
      </pre> */}
      <img
        src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif"
        alt="Nicolas Cage"
      />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    // const profilePage = await userService.getProfilePage(ctx);
    return {
      props: {
        user: {
          ...session,
          // ...profilePage.user,
        },
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

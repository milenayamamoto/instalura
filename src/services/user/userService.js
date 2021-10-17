import { HttpClient } from '../../infra/http/HttpClient';
import { authService } from '../auth/authService';

const BASE_URL = 'https://instalura-api-git-master-omariosouto.vercel.app';
// isStagingEnv
//   ? 'https://instalura-api-git-master-omariosouto.vercel.app'
//   : 'https://instalura-api.omariosouto.vercel.app';

export const userService = {
  async getProfilePage(ctx) {
    const url = `${BASE_URL}/api/users/posts`;

    try {
      const token = await authService(ctx).getToken();

      const response = await HttpClient(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return {
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Não conseguimos trazer os posts');
    }
  },

  async getUser(ctx) {
    const auth = authService(ctx);

    const session = await auth.getSession();

    return {
      user: session,
    };
  },

  async getUsers() {
    const url = `${BASE_URL}/api/users`;

    try {
      const response = await fetch(url).then(async (respostaDoServer) => {
        const resposta = await respostaDoServer.json();
        return resposta;
      });

      return {
        users: response.data,
      };
    } catch (err) {
      throw new Error('Não conseguimos trazer os usuários');
    }
  },
};

export const githubProfile = {
  async getGithubProfile(name) {
    const url = `https://api.github.com/users/${name}`;

    try {
      const response = await fetch(url).then(async (respostaDoServer) => {
        const resposta = await respostaDoServer.json();
        return resposta;
      });

      return {
        githubUser: response,
      };
    } catch (err) {
      throw new Error('Não conseguimos trazer o usuário do Github');
    }
  },
};

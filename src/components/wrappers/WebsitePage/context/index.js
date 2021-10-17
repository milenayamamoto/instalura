import { createContext } from 'react';

export const WebsitePageContext = createContext({
  toggleModalCadastro: () => {},
  getCMSContent: (cmsKey) => cmsKey,
  profile: {},
  user: {},
  users: {},
  githubUser: {},
});

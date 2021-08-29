import React from 'react';
import { Lottie } from '@crello/react-lottie';
import { Box } from '../src/components/foundation/layout/Box';
import Text from '../src/components/foundation/Text';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';
import successAnimation from '../src/components/patterns/FormCadastro/animations/404.json';

function Page404() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Text
        variant="title"
        tag="h1"
        color="tertiary.main"
        textAlign={{
          xs: 'center',
          md: 'left',
        }}
      >
        Página não encontrada
      </Text>
      <Lottie
        width="350px"
        height="350px"
        config={{ animationData: successAnimation, loop: true, autoplay: true }}
      />
    </Box>
  );
}

export default websitePageHOC(Page404, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Página 404',
    },
  },
});

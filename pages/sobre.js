import React from 'react';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function PageSobre() {
  return <div>Página Sobre</div>;
}

export default websitePageHOC(PageSobre, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Sobre',
    },
  },
});

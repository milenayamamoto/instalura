import React from 'react';
import FAQScreen from '../../src/components/screens/FAQScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import { BASE_URL } from '../../src/theme/utils/baseUrl';

function FAQPage({ faqCategories }) {
  return <FAQScreen faqCategories={faqCategories} />;
}

FAQPage.propTypes = FAQScreen.propTypes;

export default websitePageHOC(FAQPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'FAQ',
    },
  },
});

export async function getStaticProps() {
  const faqCategories = await fetch(
    `${BASE_URL}/api/content/faq`,
  )
    .then((respostaDoServer) => respostaDoServer.json())
    .then((respostaConvertida) => respostaConvertida.data);

  return {
    props: {
      faqCategories,
    },
  };
}

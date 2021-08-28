import React from 'react';
import FAQScreen from '../../src/components/screens/FAQScreen';

export default function FAQPage(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FAQScreen {...props} />;
}

export async function getStaticProps() {
  const faqCategories = await fetch(
    'https://instalura-api.vercel.app/api/content/faq',
  )
    .then((respostaDoServer) => respostaDoServer.json())
    .then((respostaConvertida) => respostaConvertida.data);

  return {
    props: {
      faqCategories,
    },
  };
}

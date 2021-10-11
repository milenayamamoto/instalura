import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import { BASE_URL } from '../../src/theme/utils/baseUrl';

function FAQInternaScreen({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQInternaScreen.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternaScreen);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch(
    `${BASE_URL}/api/content/faq`,
  ).then(async (respostaDoServer) => {
    const resposta = await respostaDoServer.json();
    return resposta.data;
  });

  const dadosDaPagina = faqCategories.reduce((acc, faqCategory) => {
    const foundQuestion = faqCategory.questions.find((question) => {
      if (question.slug === params.slug) {
        return true;
      }
      return false;
    });

    if (foundQuestion) {
      return {
        ...acc,
        category: faqCategory,
        question: foundQuestion,
      };
    }

    return acc;
  }, {});

  return {
    props: {
      category: dadosDaPagina.category,
      question: dadosDaPagina.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: dadosDaPagina.question.title,
        },
      },

    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch(
    `${BASE_URL}/api/content/faq`,
  ).then(async (respostaDoServer) => {
    const resposta = await respostaDoServer.json();
    return resposta.data;
  });

  const paths = faqCategories.reduce((acc, faqCategory) => {
    const questionPaths = faqCategory.questions.map((question) => {
      const questionSlug = question.slug;
      return { params: { slug: questionSlug } };
    });

    return [...acc, ...questionPaths];
  }, []);

  return {
    paths,
    fallback: false,
  };
}

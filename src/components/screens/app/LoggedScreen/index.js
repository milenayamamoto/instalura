import { isEmpty } from 'lodash';
import React, { useState, useContext, useEffect } from 'react';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import { WebsitePageContext } from '../../../wrappers/WebsitePage';

export default function LoggedScreen() {
  const websitePageContext = useContext(WebsitePageContext);
  const { posts, githubUser } = websitePageContext;

  const [slicedPosts, setSlicedPosts] = useState([]); // API is not paginated, therefore the slice

  useEffect(() => {
    if (isEmpty(posts?.data)) return;

    setSlicedPosts(posts?.data.slice(0, 5));
  }, [posts]);

  const renderProfileHeader = () => {
    if (!isEmpty(githubUser?.error)) {
      return <p>Erro ao carregar o usuário no Github!</p>;
    }
    return !isEmpty(githubUser?.data?.githubUser?.message) ? (
      <p>Não foi possível encontrar esse usuário no Github!</p>
    ) : (
      <Grid.Container marginTop="70px">
        <Grid.Row>
          <Grid.Col
            value={{ xs: 12, md: 5 }}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
          >
            <img
              src={`${githubUser?.data?.githubUser.html_url}.png`}
              alt={`Foto de ${githubUser?.data?.githubUser.name}`}
              style={{ borderRadius: '50%', width: '150px' }}
            />
          </Grid.Col>
          <Grid.Col
            value={{ xs: 12, md: 5 }}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
          >
            <Grid.Row style={{ gap: '40px' }}>
              <div
                style={{
                  fontWeight: '500',
                  fontSize: '24px',
                  color: '#070C0E',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span>{githubUser?.data?.githubUser.public_repos}</span>
                <span
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    color: '#88989E',
                  }}
                >
                  repos
                </span>
              </div>
              <div
                style={{
                  fontWeight: '500',
                  fontSize: '24px',
                  color: '#070C0E',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span>{githubUser?.data?.githubUser.following}</span>
                <span
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    color: '#88989E',
                  }}
                >
                  seguindo
                </span>
              </div>
              <div
                style={{
                  fontWeight: '500',
                  fontSize: '24px',
                  color: '#070C0E',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span>{githubUser?.data?.githubUser.followers}</span>
                <span
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    color: '#88989E',
                  }}
                >
                  seguidores
                </span>
              </div>
            </Grid.Row>
            <Grid.Row style={{ marginTop: '32px' }}>
              <span
                style={{
                  fontWeight: '500',
                  fontSize: '24px',
                  color: '#070C0E',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {githubUser?.data?.githubUser.name}
              </span>
              <span
                style={{
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  color: '#88989E',
                }}
              >
                {githubUser?.data?.githubUser.bio}
              </span>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    );
  };

  const renderPosts = () => ((isEmpty(posts?.data) && !posts.loading) ? (
    <p>Esse usuário ainda não realizou nenhuma postagem!</p>
  ) : (
    <Grid.Container
      display="grid"
      marginTop="70px"
      style={{
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4rem',
        width: '70%',
      }}
    >
      {slicedPosts.map((post) => (
        <img
          src={post.photoUrl}
          alt={post.description}
          style={{ width: '100%' }}
        />
      ))}
    </Grid.Container>
  ));

  return (
    <Box backgroundColor="#E5E5E5" padding="2rem 0 0 0" height="100%">
      {renderProfileHeader()}
      {renderPosts()}
    </Box>
  );
}

import React, { useContext, useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { parseCookies } from 'nookies';
import { useSnackbar } from 'react-simple-snackbar';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import { WebsitePageContext } from '../../../wrappers/WebsitePage';
import Card from '../../../patterns/Card';
import LateralMenu from '../../../commons/LateralMenu';
import { LOGIN_COOKIE_APP_TOKEN } from '../../../../services/login/loginService';
import { BASE_URL } from '../../../../theme/utils/baseUrl';

export default function ProfileScreen() {
  const websitePageContext = useContext(WebsitePageContext);
  const {
    posts, user, users, hasFilterByLikedPosts, search,
  } = websitePageContext;

  const [openSnackbar] = useSnackbar({ position: 'top-center' });

  const [updatedPosts, setUpdatedPosts] = useState([]);
  const [likedPost, setLikedPost] = useState();

  useEffect(() => {
    if (isEmpty(posts?.data)) return;

    setUpdatedPosts(posts?.data);
  }, [posts]);

  useEffect(() => {
    if (!hasFilterByLikedPosts) return setUpdatedPosts(posts?.data);

    const filteredLikedPosts = updatedPosts.reduce(
      (acc, post) => (post?.likes.some((like) => like.user === user.id) ? [...acc, post] : acc),
      [],
    );

    openSnackbar('Filtro de postagens realizado com sucesso!');

    return setUpdatedPosts(filteredLikedPosts);
  }, [hasFilterByLikedPosts]);

  useEffect(() => {
    if (isEmpty(search)) return setUpdatedPosts(posts?.data);

    const term = new RegExp(search, 'g');
    const filteredPostsWithTerm = updatedPosts.reduce(
      (acc, post) => (post?.description.match(term) ? [...acc, post] : acc),
      [],
    );

    openSnackbar('Filtro de postagens realizado com sucesso!');

    return setUpdatedPosts(filteredPostsWithTerm);
  }, [search]);

  const handleLike = async (post) => {
    const url = `${BASE_URL}/api/posts/${post._id}/like`;

    try {
      const cookies = parseCookies();
      const token = cookies[LOGIN_COOKIE_APP_TOKEN];

      const responseLike = await fetch(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {},
      }).then(async (res) => {
        if (res.status === 204) {
          const filteredLikes = post.likes.filter((like) => like.user !== user.id);
          const filteredPost = { ...post, likes: [...filteredLikes] };
          return filteredPost;
        }

        const resposta = await res.json();
        return resposta.data;
      });

      setLikedPost(responseLike);
    } catch (err) {
      openSnackbar('Sua curtida não pode ser registrada');
    }
  };

  useEffect(() => {
    if (isEmpty(likedPost)) return;

    const newPosts = updatedPosts.reduce(
      (acc, post) => (post._id === likedPost._id ? [...acc, likedPost] : [...acc, post]),
      [],
    );
    setUpdatedPosts(newPosts);
    setLikedPost(null);
  }, [likedPost]);

  const renderPosts = () => updatedPosts?.map((post) => (
    <Card
      user={user}
      post={post}
      users={users}
      key={post._id}
      onLike={handleLike}
    />
  ));

  const renderLateralMenu = () => <LateralMenu user={user} users={users} />;

  const renderMainPosts = () => (
    <Grid.Col>
      {(isEmpty(posts?.data) && !posts?.loading) && <span>Você não possui nenhuma postagem!</span>}

      {hasFilterByLikedPosts && <small style={{ display: 'block', marginBottom: '1rem' }}>Exibindo posts curtidos por você</small>}

      {!isEmpty(search) && (
      <small style={{ display: 'block', marginBottom: '1rem' }}>
        Exibindo posts com a seguinte descrição:
        {' '}
        <i>{search}</i>
      </small>
      )}

      <span style={{ display: 'block', marginBottom: '1rem' }}>
        Total de postagens:
        {' '}
        {!isEmpty(updatedPosts) ? updatedPosts?.length : 0}
      </span>
      {renderPosts()}
    </Grid.Col>
  );

  return (
    <Box backgroundColor="#E5E5E5" padding="2rem 0 0 0">
      <Grid.Container display="flex">
        {renderMainPosts()}
        <Grid.Col>{renderLateralMenu()}</Grid.Col>
      </Grid.Container>
    </Box>
  );
}

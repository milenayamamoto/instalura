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

export default function ProfileScreen() {
  const websitePageContext = useContext(WebsitePageContext);
  const { posts, user, users } = websitePageContext;

  const [openSnackbar] = useSnackbar({ position: 'top-center' });

  // eslint-disable-next-line spaced-comment
  const [slicedPosts, setSlicedPosts] = useState([]); //API is not paginated, therefore the slice
  const [likedPost, setLikedPost] = useState();

  useEffect(() => {
    if (isEmpty(posts)) return;

    setSlicedPosts(posts.slice(0, 15));
  }, [posts]);

  const handleLike = async (post) => {
    const url = `https://instalura-api.vercel.app/api/posts/${post._id}/like`;

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

    const updatedPosts = slicedPosts.reduce(
      (acc, post) => (post._id === likedPost._id ? [...acc, likedPost] : [...acc, post]),
      [],
    );
    setSlicedPosts(updatedPosts);
  }, [likedPost]);

  const renderPosts = () => slicedPosts?.map((post) => (
    <Card
      user={user}
      post={post}
      users={users}
      key={post._id}
      onLike={handleLike}
    />
  ));

  const renderLateralMenu = () => <LateralMenu user={user} users={users} />;

  return (
    <Box backgroundColor="#E5E5E5" padding="2rem 0 0 0">
      <Grid.Container display="flex">
        <Grid.Col>{!isEmpty(slicedPosts) && renderPosts()}</Grid.Col>
        <Grid.Col>{renderLateralMenu()}</Grid.Col>
      </Grid.Container>
    </Box>
  );
}

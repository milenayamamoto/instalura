import React, { useContext, useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { parseCookies } from 'nookies';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import { WebsitePageContext } from '../../../wrappers/WebsitePage';
import Card from '../../../patterns/Card';
import LateralMenu from '../../../commons/LateralMenu';
import { LOGIN_COOKIE_APP_TOKEN } from '../../../../services/login/loginService';
import { HttpClient } from '../../../../infra/http/HttpClient';

export default function ProfileScreen() {
  const websitePageContext = useContext(WebsitePageContext);
  const { posts, user, users } = websitePageContext;

  // eslint-disable-next-line spaced-comment
  const [slicedPosts, setSlicedPosts] = useState([]); //API is not paginated, therefore the slice
  const [likedPost, setLikedPost] = useState();

  useEffect(() => {
    if (isEmpty(posts)) return;

    setSlicedPosts(posts.slice(0, 5));
  }, [posts]);

  // eslint-disable-next-line no-console
  console.log('CONTEXT', posts?.[0], user, users, slicedPosts);

  const handleLike = (id) => async () => {
    const url = `https://instalura-api.vercel.app/api/posts/${id}/like`;

    try {
      const cookies = parseCookies();
      const token = cookies[LOGIN_COOKIE_APP_TOKEN];

      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {},
      });

      setLikedPost(response.data);
    } catch (err) {
      throw new Error('Não conseguimos registrar a curtida');
    }
  };
  // eslint-disable-next-line no-console
  console.log({ likedPost });

  useEffect(() => {
    if (isEmpty(likedPost)) return;

    const updatedPosts = slicedPosts.filter((post) => post._id !== likedPost._id);
    setSlicedPosts([...updatedPosts]);
    slicedPosts.push(likedPost);
  }, [likedPost]);

  const renderPosts = () => slicedPosts?.map((post) => (
    <Card
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

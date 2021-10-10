import React, { useContext, useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import { WebsitePageContext } from '../../../wrappers/WebsitePage';
import Card from '../../../patterns/Card';
import LateralMenu from '../../../commons/LateralMenu';

export default function ProfileScreen() {
  const websitePageContext = useContext(WebsitePageContext);
  const { posts, user } = websitePageContext;

  // eslint-disable-next-line spaced-comment
  const [slicedPosts, setSlicedPosts] = useState([]); //API is not paginated, therefore the slice

  useEffect(() => {
    if (isEmpty(posts)) return;

    setSlicedPosts(posts.slice(0, 5));
  }, [posts]);

  // eslint-disable-next-line no-console
  console.log('CONTEXT', posts, posts?.[0], user, slicedPosts);

  const renderPosts = () => slicedPosts?.map((post) => <Card user={user} post={post} key={post._id} />);

  const renderLateralMenu = () => <LateralMenu user={user} />;

  return (
    <Box backgroundColor="#E5E5E5" padding="2rem 0 0 0">
      <Grid.Container display="flex">
        <Grid.Col>{!isEmpty(slicedPosts) && renderPosts()}</Grid.Col>
        <Grid.Col>{renderLateralMenu()}</Grid.Col>
      </Grid.Container>
    </Box>
  );
}

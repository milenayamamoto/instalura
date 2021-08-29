/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WebsitePageWrapper from '..';
import WebsiteGlobalProvider from '../provider';

export default function websitePageHOC(
  PageComponent,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props) => (
    <WebsiteGlobalProvider>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <WebsitePageWrapper {...pageWrapperProps} {...props.pageWrapperProps}>
        <PageComponent {...props} />
      </WebsitePageWrapper>
    </WebsiteGlobalProvider>
  );
}

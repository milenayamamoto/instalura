import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styled, { css } from 'styled-components';
import Link from '../Link';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../theme/utils/propToStyle';

const ButtonGhost = css`
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  background: transparent;
`;

const ButtonDefault = css`
  color: white;
  background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

export const ButtonWrapper = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  transition: opacity ${({ theme }) => theme.transition};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ fontSize }) => (`${fontSize} !important` ?? '16px')};

  ${TextStyleVariantsMap.smallestException}


  ${({ ghost }) => (ghost ? ButtonGhost : ButtonDefault)}

  transition: opacity ${({ theme }) => theme.transition};

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

  &:disabled {
    cursor: not-allowed;
    opacity: .2s;
  }

  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `};

  ${propToStyle('margin')}
  ${propToStyle('display')}
  ${propToStyle('justifyContent')}
  ${propToStyle('fontSize')}
`;

export function Button({ href, children, ...props }) {
  const hasHref = Boolean(href);
  const tag = hasHref ? Link : 'button';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonWrapper as={tag} href={href} {...props}>
      {children}
    </ButtonWrapper>
  );
}

Button.defaultProps = {
  href: undefined,
};

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

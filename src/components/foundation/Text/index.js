import React from 'react'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import PropTypes from 'prop-types'

export const TextStyleVariantsMap = {
  paragraph1: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.paragraph1.fontSize};
      font-weight: ${theme.typographyVariants.paragraph1.fontWeight};
      line-height: ${theme.typographyVariants.paragraph1.lineHeight};
    `}
  `,
  smallestException: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.smallestException.fontSize};
      font-weight: ${theme.typographyVariants.smallestException.fontWeight};
      line-height: ${theme.typographyVariants.smallestException.lineHeight};
    `}
  `
}

const TextBase = styled.span`
  ${({ variant }) => TextStyleVariantsMap[variant]}
  color: ${({ theme, color }) => get(theme, `colors.${color}.color`)};
`

export function Text({ tag, variant, children, ...props }) {
  return (
    <TextBase
      as={tag}
      variant={variant}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </TextBase>
  )
}

Text.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span']),
  variant: PropTypes.oneOf(['paragraph1', 'smallestException']),
  children: PropTypes.node.isRequired
}

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1'
}

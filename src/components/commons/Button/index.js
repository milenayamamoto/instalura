import get from 'lodash/get'
import styled, { css } from 'styled-components'
import { TextStyleVariantsMap } from '../../foundation/Text'
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia'
import { propToStyle } from '../../../theme/utils/propToStyle'

const ButtonGhost = css`
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  background: transparent;
`

const ButtonDefault = css`
  color: white;
  background-color: ${function (props) {
    return get(props.theme, `colors.${props.variant}.color`)
  }};
  color: ${function (props) {
    return get(props.theme, `colors.${props.variant}.contrastText`)
  }};
`

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  transition: opacity ${({ theme }) => theme.transition};
  border-radius: ${({ theme }) => theme.borderRadius};

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
    `
  })}

  ${propToStyle('margin')}
  ${propToStyle('display')}
`

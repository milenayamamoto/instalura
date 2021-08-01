import { css } from 'styled-components'
import { breakpoints } from '../index'

export function breakpointsMedia(cssByBreakpoints) {
  const breakpointsNames = Object.keys(cssByBreakpoints)

  return breakpointsNames.map(breakpointName => {
    return css`
      @media only screen and (min-width: ${breakpoints[breakpointName]}px) {
        ${cssByBreakpoints[breakpointName]}
      }
    `
  })
}

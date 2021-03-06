import styled from 'styled-components';
import { propToStyle } from '../../../../theme/utils/propToStyle';

export const Box = styled.div`
  ${propToStyle('flex')}
  ${propToStyle('gap')}
  ${propToStyle('display')}
  ${propToStyle('flexDirection')}
  ${propToStyle('justifyContent')}
  ${propToStyle('alignItems')}
  ${propToStyle('flexWrap')}
  ${propToStyle('background')}
  ${propToStyle('backgroundImage')}
  ${propToStyle('backgroundColor')}
  ${propToStyle('backgroundRepeat')}
  ${propToStyle('backgroundPosition')}
  ${propToStyle('borderRadius')}
  
  ${propToStyle('position')}
  ${propToStyle('top')}
  ${propToStyle('left')}

  ${propToStyle('boxShadow')}
  ${propToStyle('padding')}

  ${propToStyle('width')}
  ${propToStyle('height')}
  ${propToStyle('listStyle')}
  ${propToStyle('margin')}
  ${propToStyle('marginLeft')}
  ${propToStyle('marginTop')}
  ${propToStyle('marginBottom')}
  ${propToStyle('marginRight')}
  ${({ theme, borderRadiusTheme }) => borderRadiusTheme && `border-radius: ${theme.borderRadius}`};
`;

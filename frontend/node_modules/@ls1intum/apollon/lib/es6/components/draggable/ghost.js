import { styled } from '../theme/styles';
export const Ghost = styled.div.attrs(({ position }) => ({
    style: { transform: `translate(${position.x}px, ${position.y}px)` },
})) `
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  pointer-events: none;
  margin: -5px;
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size}px;

  svg {
    fill-opacity: 0.7;
  }
  text {
    fill: black;
    fill-opacity: 0.7;
  }
`;
//# sourceMappingURL=ghost.js.map
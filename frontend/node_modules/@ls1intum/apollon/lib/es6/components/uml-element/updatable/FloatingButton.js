import React from 'react';
import { styled } from '../../theme/styles';
const FloatingButtonContainer = styled.g.attrs((props) => ({
    ...props,
})) `
  transition: all 180ms ease-in-out;
  pointer-events: all;

  path {
    pointer-events: all;
    fill: var(--apollon-primary-contrast);
  }
  rect {
    pointer-events: all;
    fill: var(--apollon-background);
    stroke: var(--apollon-gray);
  }
  :hover {
    transform: translate(0px, -30px);
  }
  :active {
    transform: translate(0px, -30px);
  }
  :hover rect {
    fill: var(--apollon-gray);
    stroke: var(--apollon-gray-variant);
  }
  :active rect {
    fill: var(--apollon-gray);
    stroke: var(--apollon-gray-variant);
  }
`;
export const FloatingButton = ({ children, ...props }) => {
    return (React.createElement(FloatingButtonContainer, { ...props },
        React.createElement("rect", { height: 30, width: 30, rx: "0.25rem", ry: "0.25rem" }),
        children));
};
//# sourceMappingURL=FloatingButton.js.map
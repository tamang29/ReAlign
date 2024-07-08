import React from 'react';
import { styled } from '../../theme/styles';
const Svg = styled.svg `
  height: 1em;
  vertical-align: middle;
  width: 1em;
`;
export const Icon = (props) => (React.createElement(Svg, { width: "16px", height: "16px", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", ...props }));
//# sourceMappingURL=icon.js.map
import React from 'react';
import { clamp } from '../../utils/clamp';
import { styled } from '../theme/styles';
const ZoomButton = styled.button `
  background: var(--apollon-background);
  color: var(--apollon-primary-contrast);
  border: 1px solid var(--apollon-gray);
  margin: 0;
  outline: none;
  border-radius: 0.25rem;
  width: 2.25em;
  height: 2.25em;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: var(--apollon-gray);
    border-color: var(--apollon-gray-variant);
  }

  :active {
    background-color: var(--apollon-gray);
    border-color: var(--apollon-gray-variant);
  }
`;
export const ZoomPaneComponent = (props) => {
    const { min = 0.5, max = 5, step = 0.5, value, onChange, style } = props;
    return (React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            right: '0.75em',
            bottom: '0.75em',
            ...style,
        } },
        React.createElement(ZoomButton, { style: { marginBottom: '0.5em' }, onClick: () => onChange(clamp(value + step, min, max)) }, "+"),
        React.createElement(ZoomButton, { onClick: () => onChange(clamp(value - step, min, max)) }, "-")));
};
export const ZoomPane = ZoomPaneComponent;
//# sourceMappingURL=zoom-pane.js.map
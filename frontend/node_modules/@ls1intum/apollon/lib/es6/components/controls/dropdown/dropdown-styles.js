import { styled } from '../../theme/styles';
import { Button } from '../button/button';
export const StyledDropdown = styled.div ``;
export const StyledDropdownItem = styled(Button).attrs({
    block: true,
    color: 'link',
}) `
  color: ${(props) => props.theme.font.color};
  padding-right: 1.5em;
  padding-left: 1.5em;
  text-align: left;

  :hover {
    text-decoration: none;
    background-color: ${(props) => props.theme.color.gray};
  }
`;
//# sourceMappingURL=dropdown-styles.js.map
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';

const colors = {
    accent: '#911',
    highlight: '#D22',
    contrast: '#FFF',
};

const Label = styled.Text`
  color: ${props => !props.outline ? colors.contrast : colors.accent};
  font-weight: 700;
  align-self: center;
  padding: 10px;
`;

const ButtonContainer = styled.TouchableHighlight`
  background-color: ${props => props.outline ? colors.contrast : colors.accent};
  width: 80%;
  margin-top: 5px;
  border-color: ${colors.accent};
  border-width: 2px;
`;

const Button = (props) => {
    return (
        <ButtonContainer underlayColor={colors.highlight} onPress={props.onPress} outline={props.outline}>
            <Label outline={props.outline}>
                {props.children}
            </Label>
        </ButtonContainer>
    );
};

export default Button;

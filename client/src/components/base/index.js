import styled from "styled-components";
import utils from "./utils";


const DefaultComponent = styled.div.attrs({
    id: props => props.id,
    className: props => props.className,
    placeholder: props => props.placeHolder,
    autoComplete: props => props.autoComplete,
    htmlFor: props => props.htmlFor,
    disabled: props => props.disabled,
    value: props => props.value,
    checked: props => props.checked,
    selected: props => props.selected,
    defaultValue: props => props.defaultValue,
    defaultChecked: props => props.defaultChecked,
    type: props => props.type,
    multiple: props => props.multiple,
    src: props => props.src,
    href: props => props.href,
    "data-error": props => props.dataError,
    "data-success": props => props.dataSuccess,
    "data-target": props => props.dataTarget,
    "data-icon": props => props.dataIcon,
    "data-indicators": props => props.dataIndicators,
    target: props => props.target,
})`
  cursor: ${props => props.cursor};
  border: ${props => props.border};
  background-color: ${props => props.backgroundColor};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  margin: ${props => props.margin + " !important"};
  padding: ${props => props.padding};
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  min-width: ${props => props.minWidth};
  height: ${props => props.height};
  max-height: ${props => props.maxHeight};
  min-height: ${props => props.minHeight};
  display: ${props => props.display};
  flex: ${props => props.flex};
  flex-grow: ${props => props.flexGrow};
  flex-shrink: ${props => props.flexShrink};
  flex-flow: ${props => props.flexFlow};
  align-content: ${props => props.alignContent};
  align-items: ${props => props.alignItems};
  align-self: ${props => props.alignSelf};
  justify-content: ${props => props.justifyContent};
  justify-items: ${props => props.justifyItems};
  justify-self: ${props => props.justifySelf};
  border: ${props => props.border};
  opacity: ${props => props.opacity};
  position: ${props => props.position};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};  
  text-align: ${props => props.textAlign};
  line-height: ${props => props.lineHeight};
`;

export default {
    View: DefaultComponent.withComponent("div"),
    Text: DefaultComponent.withComponent("h1"),
    Input: DefaultComponent.withComponent("input"),
    Button: DefaultComponent.withComponent("button").extend.attrs({
        className: props => {
            let ret = "waves-effect";
            if (props.className) {
                ret += " " + props.className;
            }
            if (props.color === "white") {
                return ret += " waves-gray";
            }
            else {
                return ret += " waves-light";
            }
        },
        "data-target": props => props.dataTarget
    })`
  border: none;
  background-color: ${props => {
        if (props.color === "yellow") {
            return "yellow";
        }
        if (props.color === "gray") {
            return "#898d92";
        }
        if (props.color === "white") {
            return "white";
        }
        if (props.color === "naver") {
            return "green";
        }
        return props.color;
    }};
  color: ${props => {
        if (props.textColor) {
            return props.textColor;
        }
        if (props.color === "gray" || props.color === "naver") {
            return "white";
        }
        return "black";
    }};  
  font-size: ${props => props.fontSize || "16px"};
  font-weight: ${props => props.fontWeight || "600"};;
  height: ${props => props.height || "64px"};
  width: ${props => props.width};
  cursor: pointer;
  &:focus{
    background-color: ${props => {
        if (props.color === "yellow") {
            return "yellow";
        }
        if (props.color === "gray") {
            return "#898d92";
        }
        if (props.color === "white") {
            return "white";
        }
        if (props.color === "naver") {
            return "#1cbb41";
        }
        return props.color;
    }};
    color: ${props => {
        if (props.textColor) {
            return props.textColor;
        }
        if (props.color === "gray" || props.color === "naver") {
            return "white";
        }
        return "black";
    }};
  }`,
    Utils: utils
}

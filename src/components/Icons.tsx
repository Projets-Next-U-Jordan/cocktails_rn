import { StyleProp, ViewStyle } from "react-native";
import { Circle, Line, Path, Polygon, Polyline, Svg } from "react-native-svg";

const DEFAULT_SIZE = 30;
const DEFAULT_COLOR = "#000000";

type IconProps = {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    onClick?: () => void;
}

type FillableProps = IconProps & {
    filled: boolean;
}

export const IconSearch = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg onPress={props.onClick} style={props.style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <Circle stroke={color} cx="11" cy="11" r="8"></Circle>
            <Line stroke={color} x1="21" y1="21" x2="16.65" y2="16.65"></Line>
        </Svg>
    )
}

export const IconDelete = (props: IconProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    return (
        <Svg onPress={props.onClick} style={props.style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <Polyline stroke={color} points="3 6 5 6 21 6"></Polyline>
            <Path stroke={color} d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></Path>
            <Line stroke={color} x1="10" y1="11" x2="10" y2="17"></Line>
            <Line stroke={color} x1="14" y1="11" x2="14" y2="17"></Line>
        </Svg>
    )
}

export const IconStar = (props: FillableProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    const fillColor = props.filled ? color : "none";
    return (
        <Svg onPress={props.onClick} style={props.style} width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <Polygon stroke={color} fill={fillColor} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></Polygon>
        </Svg>
    )
}

export const IconHome = (props: FillableProps) => {
    const color = props.color || DEFAULT_COLOR;
    const size = props.size || DEFAULT_SIZE;
    const fillColor = props.filled ? color : "none";
    const doorColor = props.filled ? "white" : color;
    return (
        <Svg onPress={props.onClick} style={props.style} width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <Path fill={fillColor} stroke={color} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></Path>
            <Polyline fill={doorColor} stroke={color} points="9 22 9 12 15 12 15 22"></Polyline>
        </Svg>
    )
}
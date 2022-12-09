import React from 'react';
import {StyleProp, Text, TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";

type LinkProps = {
    onPress: () => void
    text: string
    style?: StyleProp<any>
}
const Link = ({onPress, text, style, ...rest}: LinkProps) => {
    return (
        <TouchableOpacity style={style} onPress={onPress} {...rest}>
            <Text style={{color: colors.blue}}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Link;
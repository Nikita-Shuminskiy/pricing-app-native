import React from 'react';
import {StyleProp, Text, TouchableOpacity} from "react-native";

type LinkProps = {
    onPress: () => void
    text: string
    style?: StyleProp<any>
}
const Link = ({onPress, text, style, ...rest}: LinkProps) => {
    return (
        <TouchableOpacity style={style} onPress={onPress} {...rest}>
            <Text style={{color: 'blue'}}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Link;
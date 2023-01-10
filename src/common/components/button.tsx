import React from 'react';
import {StyleProp, Text, TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";

type ButtonProps = {
    onPress: () => void
    title: string
    styleContainer?: StyleProp<any>
    styleText?: StyleProp<any>
    disabled?: boolean
}
const Button = ({onPress, title, styleContainer, disabled, styleText, ...rest}: ButtonProps) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: colors.orange,
            padding: 10,
            alignItems: "center",
            width: 120,
            ...styleContainer
        }} disabled={disabled}
                          onPress={onPress} {...rest}>
            <Text style={{
                color: colors.white,
                ...styleText
            }}>{title}</Text>
        </TouchableOpacity>
    );
};
export default Button;
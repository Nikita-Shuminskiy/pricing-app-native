import React from 'react';
import {StyleProp, Text, TouchableOpacity, StyleSheet} from "react-native";
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
        <TouchableOpacity style={[styles.button, styleContainer]} disabled={disabled} onPress={onPress} {...rest}>
            <Text style={[styles.text, styleText]}>{title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.orange,
        padding: 10,
        alignItems: "center",
        width: 120,
    },
    text: {
        color: colors.white
    }
})

export default Button;
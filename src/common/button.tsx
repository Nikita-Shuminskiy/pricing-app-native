import React from 'react';
import {StyleProp, Text, TouchableOpacity, StyleSheet} from "react-native";

type ButtonProps = {
    onPress: () => void
    title: string
    style?: StyleProp<any>
    disabled?: boolean
}
const Button = ({onPress, title, style, disabled, ...rest}: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} disabled={disabled} onPress={onPress} {...rest}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        borderColor: 'orange',
        borderWidth: 2,
        padding: 10,
        alignItems: "center",
        width: 100,
    },
    text: {}
})

export default Button;
import React from 'react';
import {Box, Center, FormControl, Input, WarningOutlineIcon} from "native-base";
import {KeyboardTypeOptions, StyleProp, Text, TextStyle, View} from "react-native";
import {colors} from "../../assets/colors/colors";

type InputCustomProps = {
    placeholder: string
    label: string
    errorMessage: string
    onChangeText: (value) => void
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    keyboardType?: KeyboardTypeOptions
    onBlur?: (value) => void
    style?: StyleProp<TextStyle>
    value: string
    isRequired?: boolean
    isInvalid?: boolean
}
const InputCustom = ({
                         label,
                         onChangeText,
                         placeholder,
                         errorMessage,
                         error,
                         textErrorStyles,
                         keyboardType,
                         onBlur,
                         style,
                         value,
                         isRequired,
                         isInvalid
                     }: InputCustomProps) => {
    return (
        <Box mt={2} width={'100%'}>
            <FormControl isInvalid={isInvalid} isRequired={isRequired}>
                <FormControl.Label>{label}</FormControl.Label>
                <Input value={value}
                       style={style}
                       keyboardType={keyboardType}
                       onBlur={onBlur}
                       onChangeText={onChangeText}
                       placeholder={placeholder}
                       mt={1}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                    Поля являеться обязательным
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    );
};

export default InputCustom;
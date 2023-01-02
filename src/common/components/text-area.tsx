import React from 'react';
import {StyleProp, Text, TextStyle, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import {Box, FormControl, TextArea, WarningOutlineIcon} from "native-base";

type TextAreaProps = {
    value: string
    placeholder: string
    label: string
    onChangeText: (value) => void
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    isRequired?: boolean
}
const TextAreaCustom = ({value, onChangeText, placeholder, label, isRequired, textErrorStyles, error}: TextAreaProps) => {
    return (
        <Box mt={2} width={'100%'} flex={1} alignItems={'center'}>
            <FormControl isRequired={isRequired} isInvalid={error}>
                <FormControl.Label>{label}</FormControl.Label>
                <TextArea mt={1}
                          placeholderTextColor={colors.gray}
                          placeholder={placeholder}
                          value={value}
                          onChangeText={onChangeText}
                          autoCompleteType={true}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                    Поля
                    обязательно
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    );
};

export default TextAreaCustom;
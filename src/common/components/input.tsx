import React from 'react';
import {Input} from "native-base";
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
                         value
                     }: InputCustomProps) => {
    return (
        <View style={{width: '100%', flex: 1, alignItems: 'center', marginBottom: 10}}>
            {label && <Text style={{
                color: colors.gray,
                fontWeight: 'bold',
                fontSize: 16,
                alignItems: 'flex-start',
                paddingBottom: 10,
                flex: 1,
                width: '100%'
            }}>{label}</Text>}
            <Input placeholderTextColor={colors.gray} value={value} style={style} keyboardType={keyboardType} onBlur={onBlur} onChangeText={onChangeText}
                   mx="3"
                   placeholder={placeholder} w="100%"/>
            {error &&
                <Text style={[textErrorStyles, {
                    color: 'red',
                    width: "100%",
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    fontSize: 12
                }]}>Поля
                    обязательно</Text>
            }
        </View>
    );
};

export default InputCustom;
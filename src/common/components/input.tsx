import React, {useState} from 'react';
import {Box, FormControl, Icon, Input, Pressable, WarningOutlineIcon} from "native-base";
import {KeyboardTypeOptions, StyleProp, TextStyle, TouchableOpacity} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Feather} from "@expo/vector-icons";
import {colors} from "../../assets/colors/colors";

type InputCustomProps = {
    placeholder: string
    label?: string
    errorMessage?: string
    onChangeText: (value) => void
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    keyboardType?: KeyboardTypeOptions
    onBlur?: (value) => void
    style?: StyleProp<TextStyle>
    value: string
    isRequired?: boolean
    isInvalid?: boolean
    type?: 'text' | 'password'
    icon?: JSX.Element
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
                         isInvalid,
                         type = 'text',
                         icon,
                         ...rest
                     }: InputCustomProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Box mt={2} width={'100%'}>
            <FormControl isInvalid={isInvalid} isRequired={isRequired}>
                {label && <FormControl.Label>{label}</FormControl.Label>}
                <Input value={value}
                       style={style}
                       keyboardType={keyboardType}
                       onBlur={onBlur}
                       onChangeText={onChangeText}
                       placeholder={placeholder}
                       mt={1}
                       InputRightElement={
                           type === 'text' ?
                               (
                                   <Box mr={2}>
                                       {icon}
                                   </Box>
                               )
                               :
                               (
                                   <TouchableOpacity style={{marginRight: 10}}
                                                     onPress={() => setShowPassword(!showPassword)}>
                                       <Feather
                                           name={!showPassword ? 'eye' : 'eye-off'} size={24}
                                           color={colors.gray}/>
                                   </TouchableOpacity>
                               )
                       }
                       type={type === 'text' ? 'text' : showPassword ? 'text' : 'password'}
                       {...rest}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                    {errorMessage ? errorMessage : ' Поля являеться обязательным'}
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    );
};

export default InputCustom;
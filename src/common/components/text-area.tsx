import React from 'react';
import {StyleProp, Text, TextStyle, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import {TextArea} from "native-base";

type TextAreaProps = {
    value: string
    placeholder: string
    label: string
    onChange: (value) => void
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
}
const TextAreaCustom = ({value, onChange, placeholder, label, textErrorStyles, error}: TextAreaProps) => {
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
            <TextArea placeholderTextColor={colors.gray} placeholder={placeholder} value={value}
                      onChange={onChange}
                      w="100%" autoCompleteType={true}/>
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

export default TextAreaCustom;
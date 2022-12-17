import React from 'react';
import {NativeSyntheticEvent, StyleProp, TargetedEvent, Text, TextStyle, View} from "react-native";
import {CheckIcon, Select} from "native-base";

type SelectPickerProps = {
    styles?: any
    values: string
    onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
    onValueChange: (e: string) => void
    arrItem: any[]
    defaultLabel: string
    label?: string
    mode?: 'dialog' | 'dropdown'
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    onReturnValueId?: boolean
}
const SelectPicker = ({
                          arrItem,
                          defaultLabel,
                          styles,
                          values,
                          onValueChange,
                          onBlur,
                          label,
                          mode = 'dropdown',
                          error,
                          textErrorStyles,
                          onReturnValueId
                      }: SelectPickerProps) => {
    const [service, setService] = React.useState("");
    return (
        <View>
            <Select onValueChange={onValueChange}
                    defaultValue={values} selectedValue={service} minWidth="200" accessibilityLabel={defaultLabel}
                    placeholder={defaultLabel} mt={1}>
                <Select.Item label="UX Research" value="ux"/>
                <Select.Item label="Web Development" value="web"/>
                <Select.Item label="Cross Platform Development" value="cross"/>
                <Select.Item label="UI Designing" value="ui"/>
                <Select.Item label="Backend Development" value="backend"/>
            </Select>
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

export default SelectPicker;
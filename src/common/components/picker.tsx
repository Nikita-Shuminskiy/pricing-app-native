import React from 'react';
import {Picker} from "@react-native-picker/picker";
import {NativeSyntheticEvent, StyleProp, TargetedEvent, Text, TextStyle, View} from "react-native";
import {colors} from "../../assets/colors/colors";

type SelectPickerProps<T> = {
    styles: StyleProp<TextStyle>
    values: string | number
    onBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void
    onValueChange: (e: string) => void
    arrItem: T[]
    defaultLabel: string
    label?: string
    mode?: 'dialog' | 'dropdown'
}
const SelectPicker = function <T>({
                                      arrItem,
                                      defaultLabel,
                                      styles,
                                      values,
                                      onValueChange,
                                      onBlur,
                                      label,
                                      mode = 'dialog'
                                  }: SelectPickerProps<T>) {
    return (
        <View style={{width: '94%'}}>
            {label && <Text style={{color: colors.gray, fontWeight: 'bold', fontSize: 16}}>{label}</Text>}
            <Picker
                style={styles}
                mode={mode}
                selectedValue={values}
                onBlur={onBlur}
                onValueChange={onValueChange}>
                <Picker.Item color={colors.gray} label={defaultLabel} value={''}/>
                {
                    arrItem.map((list, index) => {
                        // @ts-ignore
                        return <Picker.Item color={colors.black} label={list.value} value={list.value}/>
                    })
                }
            </Picker>
        </View>
    );
};

export default SelectPicker;


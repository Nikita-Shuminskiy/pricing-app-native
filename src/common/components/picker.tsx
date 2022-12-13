import React from 'react';
import {Picker} from "@react-native-picker/picker";
import {NativeSyntheticEvent, StyleProp, TargetedEvent, Text, TextStyle, View} from "react-native";
import {colors} from "../../assets/colors/colors";

type SelectPickerProps<T> = {
    styles?: StyleProp<TextStyle>
    values: string | number
    onBlur: (e: NativeSyntheticEvent<TargetedEvent>) => void
    onValueChange: (e: string) => void
    arrItem: Array<T & { id?: string | number, value?: string, _id: string | number, name?: string }>
    defaultLabel: string
    label?: string
    mode?: 'dialog' | 'dropdown'
    error?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    onReturnValueId?: boolean
}
const SelectPicker = function <T>({
                                      arrItem,
                                      defaultLabel,
                                      styles,
                                      values,
                                      onValueChange,
                                      onBlur,
                                      label,
                                      mode = 'dialog',
                                      error,
                                      textErrorStyles,
                                      onReturnValueId
                                  }: SelectPickerProps<T>) {
    return (
        <View style={{width: '94%'}}>
            {label && <Text style={{color: colors.gray, fontWeight: 'bold', fontSize: 16}}>{label}</Text>}
            <Picker
                style={[styles, {marginBottom: error ? 0 : 20}]}
                mode={mode}
                selectedValue={values}
                onBlur={onBlur}
                onValueChange={onValueChange}>
                <Picker.Item color={colors.gray} label={defaultLabel} value={''}/>
                {
                    arrItem.map((list, index) => {
                        const currentValue = list.value ? list.value : list.name ? list.name : null
                        const currentId = list.id ? list.id : list._id ? list._id : null

                        return <Picker.Item key={index} color={colors.black} label={currentValue} value={onReturnValueId ? currentId : currentValue}/>
                    })
                }
            </Picker>
            {error &&
                <Text style={[textErrorStyles, {
                    marginBottom: 20,
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


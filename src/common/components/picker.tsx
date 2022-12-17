import React from 'react';
import {Picker} from "@react-native-picker/picker";
import {NativeSyntheticEvent, Platform, StyleProp, TargetedEvent, Text, TextStyle, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import PickerIos from "./pickerIOS";

export type SelectPickerProps<T> = {
    styles?: StyleProp<TextStyle>
    values: string | number
    onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
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
                                      mode = 'dropdown',
                                      error,
                                      textErrorStyles,
                                      onReturnValueId
                                  }: SelectPickerProps<T>) {


    return (
        <View style={{width: '100%', marginBottom: 10}}>
            {label && <Text style={{color: colors.gray, fontWeight: 'bold', fontSize: 16}}>{label}</Text>}
            {
                Platform.OS === 'ios' ? (
                           <PickerIos arrItem={arrItem}
                                      defaultLabel={defaultLabel}
                                      onValueChange={onValueChange}
                                      values={values}
                                      styles={styles}
                                      label={label}
                                      onBlur={onBlur} />
                    ) :
                    <Picker
                        style={[styles, {marginBottom: error ? 0 : 20, borderWidth: 2, borderColor: 'gray'}]}
                        mode={mode}
                        selectedValue={values}
                        onBlur={onBlur}
                        onValueChange={onValueChange}>
                        <Picker.Item style={{fontSize: 12 }} color={colors.gray} label={defaultLabel} value={''}/>
                        {
                            arrItem.map((list, index) => {
                                const currentValue = list.value ? list.value : list.name ? list.name : null
                                const currentId = list.id ? list.id : list._id ? list._id : null

                                return <Picker.Item key={index} color={colors.black} label={currentValue}
                                                    value={onReturnValueId ? currentId : currentValue}/>
                            })
                        }
                    </Picker>
            }
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


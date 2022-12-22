import React from 'react';
import {NativeSyntheticEvent, StyleProp, TargetedEvent, Text, TextStyle, View} from "react-native";
import {Center, CheckIcon, FormControl, Select, WarningOutlineIcon} from "native-base";
import {colors} from "../../assets/colors/colors";

type SelectPickerProps<T> = {
    values: string
    onValueChange: (e: string) => void
    onBlur?: (e: any) => void
    arrItem: Array<T & { id?: string, value?: string, _id?: string, name?: string }>
    defaultLabel: string
    label?: string
    isInvalid?: boolean
    textErrorStyles?: StyleProp<TextStyle>
    onReturnValueId?: boolean
    isRequired?: boolean
}
const SelectPicker = function <T>({
                                      arrItem,
                                      defaultLabel,
                                      values,
                                      onBlur,
                                      label,
                                      isInvalid,
                                      textErrorStyles,
                                      isRequired,
                                      onReturnValueId,
                                      onValueChange,
                                      ...rest
                                  }: SelectPickerProps<T>) {
    return (
        <Center mt={2} style={{width: '100%'}}>
            <FormControl isRequired={isRequired} isInvalid={isInvalid}>
                <FormControl.Label>{label}</FormControl.Label>
                <Select {...rest}
                        onClose={() => {
                            onBlur && onBlur(true)
                        }}
                        onValueChange={onValueChange}
                        defaultValue={values}
                        placeholder={defaultLabel}
                        height={35}
                        width={'100%'}
                        accessibilityLabel="Choose Service"
                        variant={'outline'}
                        _selectedItem={{
                            bg: 'teal.600',
                            endIcon: <CheckIcon size="5"/>,
                        }}
                        mt={1}
                >
                    {
                        arrItem.map((list, index) => {
                            const currentValue = list.value ? list.value : list.name ? list.name : null
                            const currentId = list.id ? list.id : list._id ? list._id : null
                            return <Select.Item key={index} color={colors.black}
                                                label={currentValue}
                                                value={onReturnValueId ? currentId : currentValue}/>
                        })
                    }
                </Select>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon/>}>
                    Поля являеться обязательным
                </FormControl.ErrorMessage>
            </FormControl>
        </Center>
    );
};

export default SelectPicker;
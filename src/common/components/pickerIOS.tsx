import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {SelectPickerProps} from "./picker";
import {Picker} from "@react-native-picker/picker";
import {colors} from "../../assets/colors/colors";
import {Input} from "react-native-elements";
import {BottomSheet} from "react-native-btr";
import Link from "./link";

interface PickerIosProps extends SelectPickerProps<any> {

}

const PickerIos = ({
                       arrItem,
                       defaultLabel,
                       styles: style,
                       values,
                       onValueChange,
                       onBlur,
                       error,
                       onReturnValueId
                   }: PickerIosProps) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    const onValueChangeText = (value: string) => {
        setValue(value)
        onValueChange(value)
    }
    return (
        <SafeAreaView style={{flex: 1, width: '100%'}}>
            <View onTouchStart={() => setVisible(true)}>
                <Input style={styles.input} editable={false} placeholder={defaultLabel} value={value} onBlur={onBlur}
                       autoCompleteType={undefined}/>
            </View>
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <View style={styles.bottomNavigationView}>
                    <Link style={styles.linkContainer} styleText={styles.link} onPress={() => setVisible(false)}
                          text={'Сохранить'}/>
                    <Picker
                        style={styles.picker}
                        selectedValue={values}
                        onBlur={onBlur}
                        onValueChange={onValueChangeText}>
                        <Picker.Item color={colors.gray} label={defaultLabel} value={''}/>
                        {
                            arrItem.map((list, index) => {
                                const currentValue = list.value ? list.value : list.name ? list.name : null
                                const currentId = list.id ? list.id : list._id ? list._id : null
                                return <Picker.Item key={index} color={colors.black} label={currentValue}
                                                    value={onReturnValueId ? currentId : currentValue}/>
                            })
                        }
                    </Picker>
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        paddingLeft: 10,
        borderColor: colors.grayWhite,
    },
    linkContainer: {
        padding: 10,
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 10,
        marginRight: 20
    },
    link: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.blueLight
    },
    picker: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 40
    }
});

export default PickerIos;
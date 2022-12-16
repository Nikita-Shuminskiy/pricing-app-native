import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";

type SwitcherType = {
    onValueChange: (value: boolean) => void
    label?: string
    valueBefore?: string
    valueAfter?: string
}

const Switcher = ({onValueChange, label, valueBefore, valueAfter}: SwitcherType) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        onValueChange(!isEnabled)
    }
    return (
        <View style={styles.container}>
            {label && <Text style={styles.text}>{label}</Text>}
            <View style={styles.body}>
                {valueBefore && <Text style={{color: isEnabled ? colors.white : colors.orange}}>{valueBefore}</Text>}
                <Switch
                    trackColor={{false: colors.gray, true: colors.blueLight}}
                    thumbColor={isEnabled ? colors.orange : colors.grayLight}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                {valueAfter && <Text style={{color: isEnabled ? colors.orange : colors.white}}>{valueAfter}</Text>}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.gray
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }
})
export default Switcher;
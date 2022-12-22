import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import {Box} from "native-base";

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
        <Box mt={2} flex={1}>
            {label && <Text style={styles.text}>{label}</Text>}
            <View style={styles.body}>
                {valueBefore &&
                    <Text style={[styles.text, {color: isEnabled ? colors.gray : colors.orange}]}>{valueBefore}</Text>}
                <Switch
                    trackColor={{false: colors.gray, true: colors.grayLight}}
                    thumbColor={isEnabled ? colors.orange : colors.grayLight}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                {valueAfter &&
                    <Text style={[styles.text, {color: isEnabled ? colors.orange : colors.gray}]}>{valueAfter}</Text>}
            </View>
        </Box>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.gray
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
export default Switcher;
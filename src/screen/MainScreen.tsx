import React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import authStore from "../store/AuthStore/auth-store";

type HomeScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
export const MainScreen = ({ navigation }: HomeScreenProps) => {
    const {logOutUser} = authStore
    return (
        <View style={styles.container}>
            <Text> Добро пожаловать </Text>
            <Button
                title={"Выход"}
                onPress={() => logOutUser()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
    }
});

import React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import authStore from "../../store/AuthStore/auth-store";
import SafeAreaView from "../../common/components/safe-area-view";

type HomeScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
export const MainScreen = ({navigation}: HomeScreenProps) => {
    const {logOutUser} = authStore
    return (<SafeAreaView>
            <View style={styles.container}>

        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

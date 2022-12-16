import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from "react-native";

type LoginLayoutProps = {
    children: JSX.Element | JSX.Element[];
}
const LoginLayout = ({children}: LoginLayoutProps) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
               <View style={styles.container}>
                   {children}
               </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        paddingBottom: 8,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
});

export default LoginLayout;

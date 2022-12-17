import React from 'react';
import {Platform, SafeAreaView} from "react-native";
import {KeyboardAvoidingView} from "native-base";

type LoginLayoutProps = {
    children: JSX.Element | JSX.Element[];
}
const LoginLayout = ({children}: LoginLayoutProps) => {
    return (
        <SafeAreaView style={{flex: 1, paddingTop: '25%'}}>
            <KeyboardAvoidingView h={{
                base: "500px",
                lg: "auto"
            }}
                                  alignItems={'center'}
                                  flex={1}
                                  justifyContent={'space-evenly'}
                                  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginLayout;

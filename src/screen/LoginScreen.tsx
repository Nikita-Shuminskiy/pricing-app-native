import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
// @ts-ignore
import logo from '../assets/logo/logo-pony-web.png'
import Link from "../common/link";
import Button from "../common/button";
import AuthStore from "../store/AuthStore/auth-store";

type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const LoginScreen = ({navigation}: LoginScreenProps) => {
    const {login} = AuthStore

    const [data, setData] = useState<any>({
        email: 'shuminskiy.nik@mail.ru',
        password: '123123123'
    })

    const onSubmit = () => {
        login({email: data.email, password: data.password})
    }
    const onPressLink = () => {
        navigation.navigate('registration')
    }
    return <View style={styles.container}>
        <Image style={styles.logo} source={logo}/>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChange={input => setData({...data, email: input})}
                autoCapitalize="none"
                placeholder={'Логин'}
                value={data.email}

            />
            <TextInput
                style={styles.input}
                onChange={input => setData({...data, password: input})}
                autoCapitalize="none"
                placeholder={'Пороль'}
                value={data.password}

            />
            <Button
                title={'Вход'}
                onPress={onSubmit}
            />
        </View>
        <Link style={styles.link} text={'Регистрация'} onPress={onPressLink}/>
    </View>
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    inputContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 50
    },
    input: {
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: 'rgb(230, 231, 233)',
        width: 200,
        height: 50,
    },
    error: {
        color: 'red'
    },
    link: {
        marginTop: 10,
        color: 'gray'
    }
});

import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
// @ts-ignore
import logo from '../assets/logo/logo-pony-web.png'
import Link from "../common/components/link";
import Button from "../common/components/button";
import AuthStore from "../store/AuthStore/auth-store";
import LoginLayout from "../common/components/login-layout/login-layout";
import SafeAreaView from "../common/components/safe-area-view/safe-area-view";
import {colors} from "../assets/colors/colors";
import iconsEnum from "../assets/ico-constants/icons-constants";
import {Icon, Input} from 'react-native-elements';
import regex from "../helpers/regex";

type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const LoginScreen = ({navigation}: LoginScreenProps) => {
    const {login} = AuthStore
    const [showPassword, setShowPassword] = useState(true)

    const onSubmit = (values, {setFieldError, setSubmitting}) => {
        login({email: values.email.trim(), password: values.password})
    }
    const onPressLink = () => {
        navigation.navigate('registration')
    }
    return (
        <SafeAreaView>
            <LoginLayout>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validate={values => {
                        const errors = {};
                        if (!regex.email.test(values.email.trim())) {
                            errors['inValidEmail'] = true;
                        }
                        return errors;
                    }}
                    onSubmit={onSubmit}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <React.Fragment>
                            <Image style={styles.logo} source={logo}/>
                            <View style={styles.inputContainer}>
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    placeholder={'введите логин'}
                                    value={values.email}
                                    rightIcon={
                                        <Icon
                                            name={iconsEnum.EMAIL.name}
                                            size={24}
                                            color={colors.gray} tvParallaxProperties={undefined}/>
                                    }
                                    autoCompleteType={true}
                                    onBlur={handleBlur('email')}
                                    errorMessage={touched.email && errors.inValidEmail && 'Некорректно введен емейл'}
                                    label={'Емайл'}
                                />
                                <Input
                                    rightIcon={
                                        <Icon
                                            /*   raised*/
                                            name={showPassword ? iconsEnum.LOCK.name : iconsEnum.LOCK_OPEN.name}
                                            size={24}
                                            onPress={() => setShowPassword(prevState => !prevState)}
                                            color={colors.gray} tvParallaxProperties={undefined}/>
                                    }
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    placeholder={'введите пароль'}
                                    onBlur={handleBlur('password')}
                                    errorMessage={errors.inValidPassword && touched.password && 'Пароль должен содержать не меньше 4-рех символов'}
                                    secureTextEntry={showPassword}
                                    value={values.password}
                                    autoCompleteType={true}
                                    label={'Пароль'}
                                />
                                <Button
                                    disabled={!!errors.inValidEmail || !!errors.inValidPassword}
                                    title={'Вход'}
                                    onPress={handleSubmit}
                                />
                            </View>
                            <Link style={styles.link} text={'Регистрация'} onPress={onPressLink}/>
                        </React.Fragment>
                    )}
                </Formik>
            </LoginLayout>
        </SafeAreaView>

    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 50,
        marginBottom: 30,
    },
    input: {
        borderColor: colors.grayWhite,
    },
    error: {
        color: colors.red
    },
    link: {
        marginTop: 40,
    }
});

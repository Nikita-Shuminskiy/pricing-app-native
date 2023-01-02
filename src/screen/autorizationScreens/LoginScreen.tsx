import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
import logo from '../../assets/logo/logo-pony-web.png'
import Link from "../../common/components/link";
import Button from "../../common/components/button";
import LoginLayout from "../../common/components/login-layout";
import {colors} from "../../assets/colors/colors";
import regex from "../../helpers/regex";
import {routerConstants} from "../../constants/router-constants/router-constants";
import {Center, ScrollView} from "native-base";
import Input from '../../common/components/input';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import rootStore from "../../store/RootStore/root-store";

type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const LoginScreen = ({navigation}: LoginScreenProps) => {
    const {AuthStoreService} = rootStore

    const onSubmit = (values, {setFieldError, setSubmitting}) => {
        AuthStoreService.login({email: values.email.trim(), password: values.password})
    }
    const onPressLink = () => {
        navigation.navigate(routerConstants.REGISTRATION)
    }
    return (
        <LoginLayout>
            <ScrollView w={["100%", "100%"]}>
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
                        if (!regex.email.test(values.email.trim())) {
                            errors['inValidPassword'] = true;
                        }
                        return errors;
                    }}
                    onSubmit={onSubmit}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <Center>
                            <Image style={styles.logo} source={logo}/>
                            <View style={styles.inputContainer}>
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    placeholder={'введите логин'}
                                    value={values.email}
                                    icon={
                                        <MaterialCommunityIcons name={"email-edit-outline"} size={24}
                                                                color={colors.gray}/>
                                    }
                                    onBlur={handleBlur('email')}
                                    errorMessage={touched.email && errors.inValidEmail && 'Некорректно введен емейл'}
                                    isInvalid={!!(errors.inValidEmail && touched.email)}
                                    isRequired={true}
                                    label={'Емайл'}
                                />
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    placeholder={'введите пароль'}
                                    onBlur={handleBlur('password')}
                                    isInvalid={!!(errors.inValidPassword && touched.password)}
                                    value={values.password}
                                    label={'Пароль'}
                                    isRequired={true}
                                    type={'password'}
                                />
                                <View style={styles.btnBlock}>
                                    <Button
                                        disabled={!!errors.inValidEmail || !!errors.inValidPassword}
                                        title={'Вход'}
                                        onPress={handleSubmit}
                                    />
                                    <Link style={styles.link} text={'Регистрация'} onPress={onPressLink}/>
                                </View>
                            </View>
                        </Center>
                    )}
                </Formik>
            </ScrollView>
        </LoginLayout>

    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    btnBlock: {
        marginTop: 60,
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 50,
        marginBottom: 100,
        marginTop: 30,
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

import React, {useState} from 'react';
import {Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
// @ts-ignore
import logo from '../assets/logo/logo-pony-web.png'
import Link from "../common/components/link";
import Button from '../common/components/button';
import AuthStore from "../store/AuthStore/auth-store";
import {Icon, Input} from "react-native-elements";
import iconsEnum from "../constants/ico-constants/icons-constants";
import {colors} from "../assets/colors/colors";
import regex from "../helpers/regex";
import SafeAreaView from "../common/components/safe-area-view/safe-area-view";

type PasswordScreenProps = {
    navigation: NavigationProp<ParamListBase>
}

const createAlert = () =>
    Alert.alert(
        "Alert",
        "Error message",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
        ]
    );

const RegistrationScreen = ({navigation}: PasswordScreenProps) => {
    const {registration} = AuthStore
    const [showPassword, setShowPassword] = useState(true)
    const onSubmit = (values, {setFieldError, setSubmitting}) => {
            registration({
                email: values.email.trim(),
                password: values.password,
                name: values.name,
                lastName: values.lastName
            }).then((res) => {
               if (!!res.data) return navigation.navigate('login')
               return createAlert()
            })
    }
    const onPressLink = () => {
        navigation.navigate('login')
    }
    return (

        <ScrollView style={{width: '100%'}}>
            <SafeAreaView>
                <Formik
                    initialValues={{
                        email: 'fffdsds@mail.ru',
                        password: '11111',
                        confirmPassword: '11111',
                        name: '23',
                        lastName: '111'
                    }}
                    validate={values => {
                        const errors = {};
                        if (!regex.email.test(values.email.trim())) {
                            errors['inValidEmail'] = true;
                        }
                        if (values.password.length < 5) {
                            errors['inValidPassword'] = true;
                        }
                        if (values.password !== values.confirmPassword) {
                            errors['inValidConfirmPassword'] = true;
                        }
                        return errors;
                    }}
                    onSubmit={onSubmit}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <KeyboardAvoidingView style={{
                            flex: 1, paddingHorizontal: 32,
                            paddingBottom: 8
                        }}>
                            <View style={styles.inputContainer}>
                                <Image style={styles.logo} source={logo}/>
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('name')}
                                    placeholder={'введите имя'}
                                    value={values.name}
                                    autoCompleteType={true}
                                    label={'Имя'}
                                />
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('lastName')}
                                    placeholder={'введите фамилию'}
                                    value={values.lastName}
                                    autoCompleteType={true}
                                    label={'Фамилия'}
                                />
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
                                    onBlur={handleBlur('email*')}
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
                                    secureTextEntry={showPassword}
                                    value={values.password}
                                    autoCompleteType={true}
                                    onBlur={handleBlur('password')}
                                    errorMessage={errors.inValidPassword && touched.password && 'Пароль должен содержать не меньше 4-рех символов'}
                                    label={'Пароль*'}
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
                                    onChangeText={handleChange('confirmPassword')}
                                    placeholder={'подтвердждение пароля'}
                                    secureTextEntry={showPassword}
                                    value={values.confirmPassword}
                                    autoCompleteType={true}
                                    renderErrorMessage={true}
                                    onBlur={handleBlur('confirmPassword')}
                                    errorMessage={errors.inValidConfirmPassword && touched.confirmPassword && 'Пароли не совпадают'}
                                />
                                <Button
                                    disabled={!!errors.inValidConfirmPassword || !!errors.inValidPassword || !!errors.inValidPassword}
                                    title={'Регистрация'}
                                    onPress={handleSubmit}
                                />
                                <Link style={styles.link} text={'Логин'} onPress={onPressLink}/>

                            </View>
                        </KeyboardAvoidingView>
                    )}
                </Formik>
            </SafeAreaView>
        </ScrollView>

    );
};
const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 50,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        borderColor: colors.grayWhite,
    },
    error: {
        color: 'red'
    },
    link: {
        marginTop: 40,
        color: 'gray'
    }
});

export default RegistrationScreen;
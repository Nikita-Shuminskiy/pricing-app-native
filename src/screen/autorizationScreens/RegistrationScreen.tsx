import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
// @ts-ignore
import logo from '../../assets/logo/logo-pony-web.png'
import Link from "../../common/components/link";
import Button from '../../common/components/button';
import AuthStore from "../../store/AuthStore/auth-store";
import {Icon, Input} from "react-native-elements";
import iconsEnum from "../../constants/ico-constants/icons-constants";
import {colors} from "../../assets/colors/colors";
import regex from "../../helpers/regex";
import SafeAreaView from "../../common/components/safe-area-view";
import {createAlert} from "../../common/components/alert";
import {routerConstants} from "../../constants/router-constants/router-constants";

type PasswordScreenProps = {
    navigation: NavigationProp<ParamListBase>
}


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
            if (!!res.data) return navigation.navigate(routerConstants.LOGIN)
            return createAlert({
                title: 'Сообщение',
                message: 'Ошибка, попробуйте позже',
                buttons: [{text: 'Закрыть', style: "cancel", onPress: () => console.log('')}]
            })
        })
    }
    const onPressLink = () => {
        navigation.navigate(routerConstants.LOGIN)
    }
    return (

        <ScrollView style={{width: '100%'}}>
            <SafeAreaView>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        name: '',
                        lastName: ''
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
                                    onBlur={handleBlur('email')}
                                    errorMessage={touched.email && errors.inValidEmail && 'Некорректно введен емейл'}
                                    label={'Емайл*'}
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
                                    styleContainer={styles.button}
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
        width: 120,
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
    button: {
        marginTop: 30
    },
    link: {
        marginTop: 40,
        color: 'gray'
    }
});

export default RegistrationScreen;
import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
import logo from '../../assets/logo/logo-pony-web.png'
import Link from "../../common/components/link";
import Button from '../../common/components/button';
import {colors} from "../../assets/colors/colors";
import regex from "../../helpers/regex";
import {routerConstants} from "../../constants/router-constants/router-constants";
import LoginLayout from "../../common/components/login-layout";
import {Center, ScrollView} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Input from "../../common/components/input";
import rootStore from "../../store/RootStore/root-store";
import {useSwipe} from "../../utils/hooks/useSwipe";

type PasswordScreenProps = {
    navigation: NavigationProp<ParamListBase>
}


const RegistrationScreen = ({navigation}: PasswordScreenProps) => {
    const {AuthStoreService} = rootStore

    const onSubmit = (values, {setFieldError, setSubmitting}) => {
        AuthStoreService.registration({
            email: values.email.trim(),
            password: values.password,
            name: values.name,
            lastName: values.lastName
        })
    }
    const onPressLink = () => {
        navigation.navigate(routerConstants.LOGIN)
    }
    const onSwipeRight = () => {
        return  navigation.navigate(routerConstants.LOGIN)
    }

    const {onTouchStart, onTouchEnd} = useSwipe(null, onSwipeRight, null, 4)
    return (
        <LoginLayout>
            <ScrollView onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd} w={["100%", "100%"]}>
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
                        <Center>
                            <Image style={styles.logo} source={logo}/>
                            <View style={styles.inputContainer}>
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('name')}
                                    placeholder={'введите имя'}
                                    value={values.name}
                                    label={'Имя'}
                                    icon={
                                        <Ionicons name={"person-outline"} size={24} color={colors.gray}/>
                                    }
                                />
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
                                    label={'Емайл'}
                                    isRequired={true}
                                    isInvalid={!!(errors.inValidEmail && touched.email)}
                                />
                                <Input
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    placeholder={'введите пароль'}
                                    value={values.password}
                                    onBlur={handleBlur('password')}
                                    errorMessage={errors.inValidPassword && touched.password && 'Пароль должен содержать не меньше 6-ти символов'}
                                    label={'Пароль'}
                                    type={'password'}
                                    isRequired={true}
                                    isInvalid={!!(errors.inValidPassword && touched.password)}
                                />
                                <Input
                                    type={'password'}
                                    style={styles.input}
                                    onChangeText={handleChange('confirmPassword')}
                                    placeholder={'подтвердждение пароля'}
                                    value={values.confirmPassword}
                                    onBlur={handleBlur('confirmPassword')}
                                    errorMessage={errors.inValidConfirmPassword && touched.confirmPassword && 'Пароли не совпадают'}
                                    isRequired={true}
                                    isInvalid={!!(errors.inValidConfirmPassword && touched.confirmPassword)}
                                />
                                <Button
                                    disabled={!!errors.inValidConfirmPassword || !!errors.inValidPassword || !!errors.inValidPassword}
                                    styleContainer={styles.button}
                                    title={'Регистрация'}
                                    onPress={handleSubmit}
                                />
                                <Link style={styles.link} text={'Логин'} onPress={onPressLink}/>
                            </View>
                        </Center>
                    )}
                </Formik>
            </ScrollView>
        </LoginLayout>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    logo: {
        width: 120,
        height: 50,
        marginBottom: 70,
        marginTop: 30,
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
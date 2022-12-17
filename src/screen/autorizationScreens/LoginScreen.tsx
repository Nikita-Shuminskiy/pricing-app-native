import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
import logo from '../../assets/logo/logo-pony-web.png'
import Link from "../../common/components/link";
import Button from "../../common/components/button";
import AuthStore from "../../store/AuthStore/auth-store";
import LoginLayout from "../../common/components/login-layout";
import SafeAreaView from "../../common/components/safe-area-view";
import {colors} from "../../assets/colors/colors";
import iconsEnum from "../../constants/ico-constants/icons-constants";
import {Icon, Input} from 'react-native-elements';
import regex from "../../helpers/regex";
import {routerConstants} from "../../constants/router-constants/router-constants";
import {Center, ScrollView} from "native-base";
import {Feather} from '@expo/vector-icons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
                                        rightIcon={
                                            <MaterialCommunityIcons name={"email-edit-outline"} size={24}
                                                                    color={colors.gray}/>
                                        }
                                        autoCompleteType={true}
                                        onBlur={handleBlur('email')}
                                        errorMessage={touched.email && errors.inValidEmail && 'Некорректно введен емейл'}
                                        label={'Емайл'}
                                    />
                                    <Input
                                        rightIcon={
                                            <Feather onPress={() => setShowPassword(prevState => !prevState)}
                                                     name={showPassword ? 'eye' : 'eye-off'} size={24}
                                                     color={colors.gray}/>
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
        paddingHorizontal: 10
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

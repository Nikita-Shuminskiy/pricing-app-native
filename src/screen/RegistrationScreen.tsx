import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Formik} from "formik";
// @ts-ignore
import logo from "../assets/logo/logo-pony-web.png";
import Link from "../common/link";
import Button from '../common/button';
import AuthStore from "../store/AuthStore/auth-store";

type PasswordScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const RegistrationScreen = ({navigation}: PasswordScreenProps) => {
    const {registration} = AuthStore
    const onSubmit = (values, {setFieldError, setSubmitting}) => {
        if (values.email && values.password) {
            registration(values)
        }
    }
    const onPressLink = () => {
        navigation.navigate('login')
    }
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                name: '',
                lastName: ''
            }}
            validate={values => {
                const errors = {};
                /* if (!validateEmail(values.email)) {
                     errors['inValidEmail'] = true;
                 } else {
                     errors['inValidEmail'] = false;
                 }*/
                return errors;
            }}
            validateOnBlur={true}
            onSubmit={onSubmit}
        >
            {({values, handleSubmit, handleChange, handleBlur, errors, isSubmitting, setFieldValue}) => {
                // @ts-ignore
                const {inValidEmail} = errors
                return <View style={styles.container}>
                    <Image style={styles.logo} source={logo}/>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChange={input => setFieldValue('name', input)}
                            autoCapitalize="none"
                            placeholder={'Имя'}
                            value={values.name}
                            onBlur={handleBlur('name')}
                        />
                        <TextInput
                            style={styles.input}
                            onChange={input => setFieldValue('lastName', input)}
                            autoCapitalize="none"
                            placeholder={'Фамилия'}
                            value={values.lastName}
                            onBlur={handleBlur('lastName')}
                        />
                        <TextInput
                            style={styles.input}
                            onChange={input => setFieldValue('email', input)}
                            autoCapitalize="none"
                            placeholder={'Емайл адресс'}
                            value={values.email}
                            onBlur={handleBlur('email')}
                        />
                        {inValidEmail && inValidEmail && <Text style={styles.error}>Не коректно введен email </Text>}
                        <TextInput
                            style={styles.input}
                            onChange={input => setFieldValue('password', input)}
                            autoCapitalize="none"
                            placeholder={'Пороль'}
                            value={values.password}
                            onBlur={handleBlur('password')}
                        />
                        <Button
                            title={'Вход'}
                            onPress={handleSubmit}
                        />
                    </View>
                    <Link style={styles.link} text={'Логин'} onPress={onPressLink}/>
                </View>
            }}
        </Formik>
    );
};
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
export default RegistrationScreen;
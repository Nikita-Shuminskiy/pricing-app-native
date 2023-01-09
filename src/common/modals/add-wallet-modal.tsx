import React, {useEffect} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import {Formik} from "formik";
import {colors} from "../../assets/colors/colors";
import Button from "../components/button";
import wallet from '../../assets/images/wallet.png';
import WalletStore from "../../store/WalletStore/wallet-store";
import HistoryStore from "../../store/HistoryStore/history-store";
import rootStore from "../../store/RootStore/root-store";
import {CurrencyType} from "../../store/Type/models";
import SelectPicker from "../components/select-picker";
import Input from "../components/input";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useSwipe} from "../../utils/hooks/useSwipe";

type ModalWindowType = {
    onClose: () => void
    visible: boolean
}
export const AddWalletModal = ({visible, onClose}: ModalWindowType) => {
    const {userId} = WalletStore
    const {allCurrencyList, getCurrencyList} = HistoryStore
    const onSwipeLeft = () => {
        return onClose()
    }

    const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, null, null, 4)

    const onSubmit = (values, {setFieldError, setSubmitting}) => {
        rootStore.WalletStoreService.addWallet(values)
    }
    useEffect(() => {
        if (!allCurrencyList) {
            getCurrencyList()
        }
    }, [])
    return (
        <Modal
            isOpen={visible}
            backdropVisible={true}
            background={'white'}
        >
            <ScrollView onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd} bounces={true} style={{width: '100%'}}>
                <SafeAreaView>
                    <Formik
                        initialValues={{
                            name: '',
                            balance: '',
                            currency: '',
                            userId: userId
                        }}
                        validateOnChange={true}
                        validateOnMount={true}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors['inValidName'] = true
                            }
                            if (!values.balance) {
                                errors['inValidBalance'] = true
                            }

                            if (!values.currency) {
                                errors['inValidCurrency'] = true
                            }
                            return errors;
                        }}
                        onSubmit={onSubmit}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, errors, touched, validateOnChange}) => (
                            <View style={styles.formikContainer}>
                                <TouchableOpacity onPress={() => onClose()} style={styles.closeIco}>
                                    <Ionicons name="close-circle-outline" size={34} color={colors.black}/>
                                </TouchableOpacity>
                                <Image style={styles.img} source={wallet}/>
                                <Text style={styles.textCreate}>Создание кошелька</Text>
                                <View style={styles.container}>
                                    <Input
                                        onChangeText={handleChange('name')}
                                        placeholder={'введите имя кошелька'}
                                        value={values.name}
                                        onBlur={handleBlur('name')}
                                        errorMessage={touched.name && errors.inValidName && 'Поля обязательно'}
                                        isInvalid={!!(touched.name && errors.inValidName)}
                                        isRequired={true}
                                        label={'Имя'}
                                    />
                                    <Input
                                        keyboardType={'numeric'}
                                        onChangeText={handleChange('balance')}
                                        placeholder={'введите баланс'}
                                        errorMessage={errors.inValidBalance && touched.balance && 'Поля обязательно'}
                                        value={values.balance}
                                        isInvalid={!!(errors.inValidBalance && touched.balance)}
                                        isRequired={true}
                                        label={'Баланс'}
                                    />
                                    <SelectPicker<CurrencyType>
                                        arrItem={allCurrencyList ? allCurrencyList : []}
                                        isRequired={true}
                                        defaultLabel={'выберете валюту'}
                                        onValueChange={handleChange('currency')}
                                        values={values.currency}
                                        label={'Валюта'}
                                        isInvalid={!!(errors.inValidCurrency && touched.currency)}/>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            disabled={!!errors.inValidCurrency || !!errors.inValidName || !!errors.inValidBalance}
                                            title={'Сохранить'}
                                            onPress={handleSubmit}
                                            styleContainer={styles.buttonSave}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </SafeAreaView>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    formikContainer: {
        flex: 1,
        alignItems: 'center'
    },
    closeIco: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    container: {
        padding: 15,
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    img: {
        marginTop: 40,
        width: 120,
        height: 120,
    },
    btnCancelText: {
        color: colors.black,
    },
    buttonSave: {
        margin: 10
    },
    textCreate: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: '700',
    },
    buttonContainer: {
        marginTop: 60,
        flexDirection: 'row'
    },
    logo: {
        width: 120,
        height: 100,
        marginBottom: 30,
    },
    error: {
        color: colors.red
    },
    link: {
        marginTop: 30,
    }
});

import React, {useEffect, useState} from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import SafeAreaView from "../components/safe-area-view";
import {Formik} from "formik";
import {Input} from "react-native-elements";
import {colors} from "../../assets/colors/colors";
import Button from "../components/button";
import wallet from '../../assets/images/wallet.png';
import WalletStore from "../../store/WalletStore/wallet-store";
import HistoryStore from "../../store/HistoryStore/history-store";
import SelectPicker from "../components/picker";
import {CurrencyType} from "../../store/Type/models";
import rootStore from "../../store/RootStore/root-store";
import {observer} from "mobx-react-lite";
import Loading from "../components/loading";

type ChangeWalletModalType = {
    onClose: () => void
    visible: boolean
}
export const ChangeWalletModal = observer(({visible, onClose}: ChangeWalletModalType) => {
    const {userId, chosenWallet, getWallet} = WalletStore
    const {allCurrencyList, getCurrencyList} = HistoryStore
    const [loading, setLoading] = useState(false)
    const onSubmit = (values, {setFieldError, setSubmitting}) => {
        setLoading(true)
        rootStore.WalletStoreService.updateWallet(chosenWallet._id, values, true).then((res) => {
            if (res) {
                onClose()
            }
            setLoading(false)
        })
    }
    useEffect(() => {
        if (!allCurrencyList) {
            getCurrencyList()
        }
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
        >
            {loading ? <Loading/> : <ScrollView style={{width: '100%'}}>

                <SafeAreaView>
                    <Formik
                        initialValues={{
                            name: chosenWallet?.name,
                            balance: chosenWallet?.balance,
                            currency: chosenWallet?.currency,
                            userId: userId
                        }}
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
                        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                            <View style={styles.formikContainer}>
                                <Image style={styles.img} source={wallet}/>
                                <Text style={styles.textCreate}>Редактирование кошелька</Text>
                                <View style={styles.container}>
                                    <Input
                                        style={styles.input}
                                        onChangeText={handleChange('name')}
                                        labelStyle={{color: colors.gray}}
                                        placeholder={'введите имя кошелька'}
                                        value={values.name}
                                        autoCompleteType={true}
                                        onBlur={handleBlur('name')}
                                        errorMessage={touched.name && errors.inValidName && 'Поля обязательно'}
                                        label={'Имя'}
                                    />
                                    <Input
                                        keyboardType={'numeric'}
                                        style={styles.input}
                                        onChangeText={handleChange('balance')}
                                        placeholder={'введите баланс'}
                                        onBlur={handleBlur('balance')}
                                        errorMessage={errors.inValidBalance && touched.balance && 'Поля обязательно'}
                                        value={String(values.balance)}
                                        autoCompleteType={false}
                                        label={'Баланс'}
                                        labelStyle={{color: colors.gray}}
                                    />
                                    <SelectPicker<CurrencyType>
                                        arrItem={allCurrencyList ? allCurrencyList : []}
                                        defaultLabel={'Выберете валюту'}
                                        onValueChange={handleChange('currency')}
                                        values={values.currency}
                                        error={errors.inValidCurrency && touched.currency as boolean}
                                        styles={styles.picker}
                                        label={'Валюта'}
                                        onBlur={handleBlur('currency')}/>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            disabled={!!errors.inValidCurrency || !!errors.inValidName || !!errors.inValidBalance}
                                            title={'Сохранить'}
                                            onPress={handleSubmit}
                                            styleContainer={styles.buttonSave}
                                        />
                                        <Button
                                            title={'Отмена'}
                                            onPress={() => onClose()}
                                            styleContainer={styles.buttonCancel}
                                            styleText={styles.btnCancelText}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                </SafeAreaView>
            </ScrollView>}
        </Modal>
    )
})

const styles = StyleSheet.create({
    formikContainer: {
        flex: 1,
        alignItems: 'center'
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
    picker: {},
    buttonCancel: {
        margin: 10,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray
    },
    btnCancelText: {
        color: colors.black,
    },
    buttonSave: {
        margin: 10
    },
    textCreate: {
        marginTop: 40,
        marginBottom: 20,
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
    input: {
        paddingLeft: 10,
        borderColor: colors.grayWhite,
    },
    error: {
        color: colors.red
    },
    link: {
        marginTop: 30,
    }
});

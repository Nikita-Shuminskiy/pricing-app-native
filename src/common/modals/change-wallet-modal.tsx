import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import {Formik} from "formik";
import {colors} from "../../assets/colors/colors";
import Button from "../components/button";
import wallet from '../../assets/images/wallet.png';
import WalletStore from "../../store/WalletStore/wallet-store";
import HistoryStore from "../../store/HistoryStore/history-store";
import {CurrencyType} from "../../store/Type/models";
import rootStore from "../../store/RootStore/root-store";
import {observer} from "mobx-react-lite";
import Loading from "../components/loading";
import SelectPicker from "../components/select-picker";
import Input from "../components/input";
import Ionicons from "react-native-vector-icons/Ionicons";

type ChangeWalletModalType = {
    onClose: () => void
    visible: boolean
}
export const ChangeWalletModal = observer(({visible, onClose}: ChangeWalletModalType) => {
    const {userId, chosenWallet} = WalletStore
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
            isOpen={visible}
            backdropVisible={true}
            background={'white'}
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
                            if (!values.currency && !values.name && !values.balance) {
                                errors['inValidFields'] = true
                            }
                            if (!values.name) {
                                errors['inValidName'] = true
                            }
                            return errors;
                        }}
                        onSubmit={onSubmit}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                            <View style={styles.formikContainer}>
                                <TouchableOpacity onPress={() => onClose()} style={styles.closeIco}>
                                    <Ionicons name="close-circle-outline" size={34} color={colors.black}/>
                                </TouchableOpacity>
                                <Image style={styles.img} source={wallet}/>
                                <Text style={styles.textCreate}>Редактирование кошелька</Text>
                                <View style={styles.container}>
                                    <Input
                                        style={styles.input}
                                        onChangeText={handleChange('name')}
                                        placeholder={'введите имя кошелька'}
                                        value={values.name}
                                        onBlur={handleBlur('name')}
                                        label={'Имя'}
                                        isInvalid={!!errors.inValidName}
                                    />
                                    <Input
                                        keyboardType={'numeric'}
                                        style={styles.input}
                                        onChangeText={handleChange('balance')}
                                        placeholder={'введите баланс'}
                                        onBlur={handleBlur('balance')}
                                        value={String(values.balance)}
                                        label={'Баланс'}
                                    />
                                    <SelectPicker<CurrencyType>
                                        arrItem={allCurrencyList ? allCurrencyList : []}
                                        defaultLabel={'Выберете валюту'}
                                        onValueChange={handleChange('currency')}
                                        values={values.currency}
                                        label={'Валюта'}/>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            disabled={!!errors.inValidFields || !!errors.inValidName}
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
            </ScrollView>}
        </Modal>
    )
})

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

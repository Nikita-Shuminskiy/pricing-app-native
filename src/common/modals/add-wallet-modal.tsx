import React, {useEffect} from "react";
import {Box, Center, Image, Modal, ScrollView, Text} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import Button from "../components/button";
import wallet from '../../assets/images/wallet.png';
import WalletStore from "../../store/WalletStore/wallet-store";
import HistoryStore from "../../store/HistoryStore/history-store";
import rootStore from "../../store/RootStore/root-store";
import {CurrencyType} from "../../store/Type/models";
import SelectPicker from "../components/select-picker";
import Input from "../components/input";
import {useSwipe} from "../../utils/hooks/useSwipe";
import {CloseModalButton} from "../components/close-modal-button";
import {useFormik} from "formik";

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

    const onSubmit = (values) => {
        rootStore.WalletStoreService.addWallet(values)
    }


    const {handleChange, handleBlur, handleSubmit, values, errors, touched} = useFormik({
        initialValues: {
            name: '',
            balance: '',
            currency: '',
            userId: userId
        },
        onSubmit: values => {
            onSubmit(values)
        },
        validateOnChange: true,
        validateOnMount: true,
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors['name'] = true
            }
            if (!values.balance) {
                errors['balance'] = true
            }
            return errors;
        }
    });

    const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, null, null, 4)

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
            <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} bounces={true} style={{width: '100%'}}>
                <SafeAreaView>
                    <Center>
                        <CloseModalButton onClose={onClose}/>
                        <Image mt={10} alt={'image-wallet'} w={120} h={120} source={wallet}/>
                        <Text mt={10} fontSize={24} fontWeight={'700'}>Создание кошелька</Text>
                        <Box p={15} flex={1} w={'100%'} justifyContent={'center'} alignItems={'center'}>
                            <Input
                                onChangeText={handleChange('name')}
                                placeholder={'введите имя кошелька'}
                                value={values.name}
                                onBlur={handleBlur('name')}
                                errorMessage={touched.name && errors.name && 'Поля обязательно'}
                                isInvalid={!!(touched.name && errors.name)}
                                isRequired={true}
                                label={'Имя'}
                            />
                            <Input
                                keyboardType={'numeric'}
                                onChangeText={handleChange('balance')}
                                placeholder={'введите баланс'}
                                errorMessage={errors.balance && touched.balance && 'Поля обязательно'}
                                value={values.balance}
                                onBlur={handleBlur('balance')}
                                isInvalid={!!(errors.balance && touched.balance)}
                                isRequired={true}
                                label={'Баланс'}
                            />
                            <SelectPicker<CurrencyType>
                                arrItem={allCurrencyList ? allCurrencyList : []}
                                isRequired={true}
                                defaultLabel={'выберете валюту'}
                                onBlur={handleBlur('currency')}
                                onValueChange={handleChange('currency')}
                                values={values.currency}
                                label={'Валюта'}
                                isInvalid={!!(errors.currency && touched.currency)}/>
                            <Box mt={60} flexDirection={'row'}>
                                <Button
                                    disabled={!!errors.currency || !!errors.name || !!errors.balance}
                                    title={'Сохранить'}
                                    onPress={handleSubmit}
                                    styleContainer={{margin: 10}}
                                />
                            </Box>
                        </Box>
                    </Center>
                </SafeAreaView>
            </ScrollView>
        </Modal>
    )
}

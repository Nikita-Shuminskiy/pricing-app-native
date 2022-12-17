import React, {useState} from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import SafeAreaView from "../components/safe-area-view";
import {Formik} from "formik";
import {colors} from "../../assets/colors/colors";
import Button from "../components/button";
import spend from '../../assets/images/spend.png';
import WalletStore from "../../store/WalletStore/wallet-store";
import SelectPicker from "../components/picker";
import {CategoryModelType, WalletModelType} from "../../store/Type/models";
import rootStore from "../../store/RootStore/root-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import AuthStore from "../../store/AuthStore/auth-store";
import Loading from "../components/loading";
import TextArea from "../components/text-area";
import Input from "../components/input";


type ModalWindowType = {
    onClose: () => void
    visible: boolean
}
export const AddSpendModal = ({visible, onClose}: ModalWindowType) => {
    const [loading, setLoading] = useState(false)
    const {wallets} = WalletStore
    const {user} = AuthStore
    const {categories} = CategoriesStore
    const {WalletStoreService} = rootStore

    const onSubmit = (values, {resetForm}) => {
        setLoading(true)
        WalletStoreService.addSpending({
            userId: user._id,
            walletId: values.wallet,
            spending: {
                title: values.categories,
                category: values.categories,
                description: values.description,
                amount: values.amount
            }
        }).then((res) => {
            if (res) {
                resetForm()
            }
            setLoading(false)
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                onClose()
            }}
        >
            {
                loading ? <Loading/> : <ScrollView style={{width: '100%'}}>
                    <SafeAreaView>
                        <Formik
                            initialValues={{
                                categories: '',
                                amount: '',
                                wallet: '',
                                description: '',
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.categories) {
                                    errors['inValidCategories'] = true
                                }
                                if (!values.amount) {
                                    errors['inValidAmount'] = true
                                }

                                if (!values.wallet) {
                                    errors['inValidWallet'] = true
                                }
                                return errors;
                            }}
                            onSubmit={onSubmit}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => (
                                <View style={styles.formikContainer}>
                                    <Image style={styles.img} source={spend}/>
                                    <Text style={styles.textCreate}>Добавление траты</Text>
                                    <View style={styles.container}>
                                        <SelectPicker<CategoryModelType>
                                            styles={styles.picker}
                                            arrItem={categories ? categories : []}
                                            defaultLabel={'выберете категорию'}
                                            onValueChange={handleChange('categories')}
                                            values={values.categories}
                                            label={'Категория'}
                                            onBlur={handleBlur('categories')}
                                            error={errors.inValidCategories && touched.categories as boolean}
                                        />
                                        <SelectPicker<WalletModelType>
                                            error={errors.inValidWallet && touched.wallet as boolean}
                                            styles={styles.picker}
                                            arrItem={wallets ? wallets : []}
                                            defaultLabel={'выберете кошелек'}
                                            onValueChange={handleChange('wallet')}
                                            values={values.wallet}
                                            label={'Кошелек в который вы хотите внести трату'}
                                            onReturnValueId={true}
                                            onBlur={handleBlur('wallet')}/>
                                        <Input
                                            keyboardType={'numeric'}
                                            style={styles.input}
                                            onChangeText={handleChange('amount')}
                                            placeholder={'введите сумму'}
                                            onBlur={handleBlur('amount')}
                                            errorMessage={errors.inValidAmount && touched.amount && 'Поля обязательно'}
                                            value={values.amount}
                                            label={'Сумма которую вы потратили'}
                                        />
                                        <SelectPicker arrItem={categories} label={'sss'} values={values.categories}
                                                      defaultLabel={'qqqq'} onValueChange={handleChange('categories')}/>

                                        <TextArea value={values.description} label={'Комментарий к трате'}
                                                  onChange={handleChange('description')}
                                                  placeholder={'введите коммментарий'}/>
                                        <View style={styles.buttonContainer}>
                                            <Button
                                                disabled={!!errors.inValidAmount || !!errors.inValidCategories || !!errors.inValidWallet}
                                                title={'Внести трату'}
                                                onPress={handleSubmit}
                                                styleContainer={styles.buttonSave}
                                            />
                                            <Button
                                                title={'Выйти'}
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
                </ScrollView>
            }

        </Modal>
    )
}

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
    picker: {},
    img: {
        marginTop: 10,
        width: 160,
        height: 160,
    },
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
        margin: 10,
    },
    textCreate: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: '700',
    },
    buttonContainer: {
        marginTop: 40,
        flexDirection: 'row'
    },
    input: {
        paddingLeft: 10,
        borderColor: colors.grayWhite,
    },
    description: {
        paddingLeft: 10,
    }
});

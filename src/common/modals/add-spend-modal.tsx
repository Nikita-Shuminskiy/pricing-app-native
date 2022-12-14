import React, {useState} from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAvoidingView, Modal} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import {Formik} from "formik";
import {colors} from "../../assets/colors/colors";
import Button from "../components/button";
import spend from '../../assets/images/spend.png';
import WalletStore from "../../store/WalletStore/wallet-store";
import {CategoryType, WalletModelType} from "../../store/Type/models";
import rootStore from "../../store/RootStore/root-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import AuthStore from "../../store/AuthStore/auth-store";
import Loading from "../components/loading";
import TextArea from "../components/text-area";
import Input from "../components/input";
import SelectPicker from "../components/select-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

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
                rootStore.WalletStoreService.getWallets(user._id)
                resetForm()
            }
            setLoading(false)
        })
    }

    return (
        <Modal
            isOpen={visible}
            backdropVisible={true}
            background={'white'}
        >
            {
                loading ? <Loading/>
                    :
                        <SafeAreaView>
                            <KeyboardAvoidingView h={{
                                base: "600px",
                                lg: "auto"
                            }} alignItems={'center'} flex={1} enabled={true}
                                                  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                <ScrollView bounces={true} style={{width: '100%'}}>
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
                                    {({
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          values,
                                          errors,
                                          touched,
                                          isSubmitting
                                      }) => (
                                        <View style={styles.formikContainer}>
                                            <TouchableOpacity onPress={() => onClose()} style={styles.closeIco}>
                                                <Ionicons name="close-circle-outline" size={34} color={colors.black}/>
                                            </TouchableOpacity>
                                            <Image style={styles.img} source={spend}/>
                                            <Text style={styles.textCreate}>???????????????????? ??????????</Text>
                                            <View style={styles.container}>
                                                <SelectPicker<CategoryType>
                                                    arrItem={categories ? categories : []}
                                                    label={'??????????????????'}
                                                    values={values.categories}
                                                    defaultLabel={'???????????????? ??????????????????'}
                                                    onValueChange={handleChange('categories')}
                                                    isRequired={true}
                                                    isInvalid={!!(errors.invalidCategory && touched.category)}
                                                />
                                                <SelectPicker<WalletModelType>
                                                    isInvalid={!!(errors.inValidWallet && touched.wallet)}
                                                    isRequired={true}
                                                    arrItem={wallets ? wallets : []}
                                                    defaultLabel={'???????????????? ??????????????'}
                                                    onValueChange={handleChange('wallet')}
                                                    values={values.wallet}
                                                    label={'?????????????? ?? ?????????????? ???? ???????????? ???????????? ??????????'}
                                                    onReturnValueId={true}/>
                                                <Input
                                                    keyboardType={'numeric'}
                                                    style={styles.input}
                                                    onChangeText={handleChange('amount')}
                                                    placeholder={'?????????????? ??????????'}
                                                    onBlur={handleBlur('amount')}
                                                    isInvalid={!!(errors.inValidAmount && touched.amount)}
                                                    isRequired={true}
                                                    errorMessage={errors.inValidAmount && touched.amount && '???????? ??????????????????????'}
                                                    value={values.amount}
                                                    label={'?????????? ?????????????? ???? ??????????????????'}
                                                />

                                                <TextArea value={values.description}
                                                          label={'?????????????????????? ?? ??????????'}
                                                          onChangeText={handleChange('description')}
                                                          placeholder={'?????????????? ????????????????????????'}/>
                                                <View style={styles.buttonContainer}>
                                                    <Button
                                                        disabled={!!errors.inValidAmount || !!errors.inValidCategories || !!errors.inValidWallet}
                                                        title={'???????????? ??????????'}
                                                        onPress={handleSubmit}
                                                        styleContainer={styles.buttonSave}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </Formik>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </SafeAreaView>

            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    formikContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
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
    picker: {},
    img: {
        marginTop: 10,
        width: 160,
        height: 160,
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

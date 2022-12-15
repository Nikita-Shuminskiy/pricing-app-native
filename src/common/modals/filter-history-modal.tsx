import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, View, Text, Switch} from "react-native";
import SafeAreaView from "../components/safe-area-view";
import HistoryStore from "../../store/HistoryStore/history-store";
import {observer} from "mobx-react-lite";
import SelectPicker from "../components/picker";
import {WalletModelType} from "../../store/Type/models";
import WalletStore from "../../store/WalletStore/wallet-store";
import imageSetting from '../../assets/images/settingBig.png'
import {colors} from "../../assets/colors/colors";
import Switcher from "../components/switcher";
import Button from "../components/button";
import rootStore from "../../store/RootStore/root-store";

type FilterHistoryModalType = {
    visible: boolean
    onClose: () => void
}
const filteredBy: any = [
    {id: 1, value: 'Сортировка по дате'},
    {id: 2, value: 'Сортировка по сумме траты'},
    {id: 3, value: 'Сортировка по имени категории'}
]
const FilterHistoryModal = observer(({visible, onClose}: FilterHistoryModalType) => {
    const {selectedWalletHistory, getCurrentHistory} = HistoryStore
    const {wallets, getWallet} = WalletStore
    const {WalletStoreService} = rootStore
    const [walletId, setWalletId] = useState('')
    const [sortBy, setSortBy] = useState('')

    const onValueChangeSwitcher = (value: boolean) => {

    }
    const onWalletValueChange = (value: string) => {
        setWalletId(value)
    }
    const onValueChangeSortBy = (value) => {
        setSortBy(value)
    }
    const onPressSave = () => {
        getCurrentHistory(walletId)
        onClose()
    }
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                onClose()
            }}
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <Image style={styles.logoSetting} source={imageSetting}/>
                    <Text style={styles.textHeader}>Настройки фильтрации для истории</Text>
                    <View style={styles.body}>
                        <SelectPicker<WalletModelType>
                            arrItem={wallets ? wallets : []}
                            defaultLabel={'выберете кошелек'}
                            onValueChange={onWalletValueChange}
                            values={walletId}
                            label={'Выберете кошелек для просмотра истории'}
                            onReturnValueId={true}
                        />
                        <SelectPicker
                            arrItem={filteredBy}
                            defaultLabel={'выберете сортировку'}
                            onValueChange={onValueChangeSortBy}
                            values={sortBy}
                            label={'Сортировка истории'}
                            onReturnValueId={true}
                        />
                        <Switcher label={'Сортировка по'} valueBefore={'Возрастанию'} valueAfter={'Убыванию'}
                                  onValueChange={onValueChangeSwitcher}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={'Сохранить'}
                            onPress={onPressSave}
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
            </SafeAreaView>
        </Modal>
    );
})
const styles = StyleSheet.create({
    logoSetting: {
        marginTop: 20,
        marginBottom: 30
    },
    buttonCancel: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray
    },
    buttonSave: {
        margin: 10
    },
    btnCancelText: {
        color: colors.black,
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        paddingLeft: 15,
    },
    textHeader: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
});
export default FilterHistoryModal;
import React, {useState} from 'react';
import {Image, Modal, StyleSheet, Text, View} from "react-native";
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
import Loading from "../components/loading";

type FilterHistoryModalType = {
    visible: boolean
    onClose: () => void
}
const filteredBy = [
    {id: 'date', value: 'Сортировка по дате'},
    {id: 'amount', value: 'Сортировка по сумме траты'},
    {id: 'category', value: 'Сортировка по имени категории'}
]
const FilterHistoryModal = observer(({visible, onClose}: FilterHistoryModalType) => {
    const {sortSelectedWalletHistory} = HistoryStore
    const {HistoryStoreService} = rootStore
    const {wallets} = WalletStore
    const [walletId, setWalletId] = useState('')
    const [sortByName, setSortByName] = useState('')
    const [toggleSortBy, setToggleSortBy] = useState(false)

    const onValueChangeSwitcher = (value: boolean) => {
        setToggleSortBy(value)
    }
    const onWalletValueChange = (value: string) => {
        setWalletId(value)
    }
    const onValueChangeSortBy = (value) => {
        setSortByName(value)
    }
    const onPressSave = () => {
        HistoryStoreService.getCurrentHistory(walletId).then((res) => {
            if (res) {
                sortSelectedWalletHistory(sortByName, toggleSortBy)
                onClose()
            }
        })

    }
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                onClose()
            }}
        ><SafeAreaView>
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
                    <SelectPicker<any>
                        arrItem={filteredBy}
                        defaultLabel={'выберете сортировку'}
                        onValueChange={onValueChangeSortBy}
                        values={sortByName}
                        label={'Сортировка истории'}
                        onReturnValueId={true}
                    />
                    <Switcher label={'Сортировка по'} valueBefore={'Возрастанию'} valueAfter={'Убыванию'}
                              onValueChange={onValueChangeSwitcher}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        disabled={!walletId}
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
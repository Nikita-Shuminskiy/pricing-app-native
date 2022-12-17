import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Box, Modal} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import HistoryStore from "../../store/HistoryStore/history-store";
import {observer} from "mobx-react-lite";
import {WalletModelType} from "../../store/Type/models";
import WalletStore from "../../store/WalletStore/wallet-store";
import {colors} from "../../assets/colors/colors";
import Switcher from "../components/switcher";
import Button from "../components/button";
import rootStore from "../../store/RootStore/root-store";
import SelectPicker from "../components/select-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import settingsImage from '../../assets/images/settings.png'

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
    const [invalidWallet, setInvalidWallet] = useState(false)

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
            isOpen={visible}
            backdropVisible={true}
            background={'white'}
        >
            <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onClose()} style={styles.closeIco}>
                    <Ionicons name="close-circle-outline" size={34} color={colors.black}/>
                </TouchableOpacity>
                <Image style={styles.logoSetting} source={settingsImage}/>
                <Text style={styles.textHeader}>Настройки фильтрации для истории</Text>
                <View style={styles.body}>
                    <SelectPicker<WalletModelType>
                        arrItem={wallets ? wallets : []}
                        defaultLabel={'выберете кошелек'}
                        onValueChange={(e) => {
                            onWalletValueChange(e)
                            setInvalidWallet(false)
                        }}
                        values={walletId}
                        label={'Выберете кошелек для просмотра истории'}
                        onReturnValueId={true}
                        isRequired={true}
                        onBlur={() => {
                            !walletId && setInvalidWallet(true)
                        }}
                        isInvalid={invalidWallet}
                    />
                    <SelectPicker<{ id: string, value: string }>
                        arrItem={filteredBy}
                        defaultLabel={'выберете сортировку'}
                        onValueChange={onValueChangeSortBy}
                        values={sortByName}
                        label={'Сортировка истории'}
                        onReturnValueId={true}
                    />
                    <Box mt={2} flex={1}>
                        <Switcher label={'Сортировка по'}
                                  valueBefore={'Возрастанию'}
                                  valueAfter={'Убыванию'}
                                  onValueChange={onValueChangeSwitcher}/>
                    </Box>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        disabled={!walletId}
                        title={'Сохранить'}
                        onPress={onPressSave}
                        styleContainer={styles.buttonSave}
                    />
                </View>
            </View>
        </SafeAreaView>

        </Modal>
    );
})
const styles = StyleSheet.create({
    logoSetting: {
        width: 150,
        height: 150,
        marginTop: 20,
        marginBottom: 60
    },
    closeIco: {
        position: 'absolute',
        right: 20,
        top: 20
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
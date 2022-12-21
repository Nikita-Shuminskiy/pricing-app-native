import React, {useState} from 'react';
import {Modal} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import filterImage from '../../assets/images/filterWichBorder.png'
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colors} from "../../assets/colors/colors";
import SelectPicker from "../components/select-picker";
import {WalletModelType} from "../../store/Type/models";
import Button from "../components/button";
import rootStore from "../../store/RootStore/root-store";
import WalletStore from "../../store/WalletStore/wallet-store";

type FilterChartModalProps = {
    visible: boolean
    onClose: () => void
}
const FilterChartModal = ({visible, onClose}: FilterChartModalProps) => {
    const {CategoryStoreService} = rootStore
    const {wallets} = WalletStore
    const [walletId, setWalletId] = useState('')

    const onPressSave = () => {
        CategoryStoreService.getChartData({
            walletId: walletId,
            typeChart: 'pie'
        })
        CategoryStoreService.getChartData({
            walletId: walletId,
            typeChart: 'line'
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
                    <Image style={styles.logoSetting} source={filterImage}/>
                    <Text style={styles.textHeader}>Настройки для графика</Text>
                    <View style={styles.body}>
                        <SelectPicker<WalletModelType>
                            arrItem={wallets ? wallets : []}
                            defaultLabel={'выберете кошелек'}
                            onValueChange={(e) => {
                                setWalletId(e)
                            }}
                            values={walletId}
                            label={'Выберете кошелек'}
                            onReturnValueId={true}
                            isRequired={true}
                        />
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
};
const styles = StyleSheet.create({
    logoSetting: {
        width: 100,
        height: 100,
        marginTop: 50,
        marginBottom: 60
    },
    closeIco: {
        position: 'absolute',
        right: 0,
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
export default FilterChartModal;
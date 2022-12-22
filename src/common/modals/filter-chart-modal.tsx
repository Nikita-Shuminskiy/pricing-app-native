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
import Loading from "../components/loading";

type FilterChartModalProps = {
    visible: boolean
    onClose: () => void
}
const arrYear = [
    {id: '2022', value: '2022'},
    {id: '2023', value: '2023'},
    {id: '2024', value: '2024'},
    {id: '2025', value: '2025'},
    {id: '2026', value: '2026'},
    {id: '2027', value: '2027'},
    {id: '2028', value: '2028'},
    {id: '2029', value: '2029'},
    {id: '2030', value: '2030'},
]
const FilterChartModal = ({visible, onClose}: FilterChartModalProps) => {
    const {CategoryStoreService} = rootStore
    const {wallets, getWallet} = WalletStore

    const [data, setData] = useState({
        year: '',
        walletId: ''
    })

    const [loading, setLoading] = useState(false)


    const onPressSave = async () => {
        setLoading(true)
        await getWallet(data.walletId)
        await CategoryStoreService.getChartData({
            walletId: data.walletId,
            year: data.year ? data.year : null,
            typeChart: 'pie'
        })
        onClose()
        setLoading(false)
    }
    return (
        <Modal
            isOpen={visible}
            backdropVisible={true}
            background={'white'}
        >
            {
                loading ? (
                        <Loading/>
                    )
                    : (
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
                                            setData({...data, walletId: e})
                                        }}
                                        values={data.walletId}
                                        label={'Выберете кошелек'}
                                        onReturnValueId={true}
                                        isRequired={true}
                                    />
                                    <SelectPicker<{ id: string, value: string }>
                                        arrItem={arrYear}
                                        defaultLabel={'выберете год'}
                                        onValueChange={(e) => {
                                            setData({...data, year: e})
                                        }}
                                        values={data.year}
                                        label={'Выберете год'}
                                        onReturnValueId={true}
                                        isRequired={false}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        disabled={!data.walletId}
                                        title={'Сохранить'}
                                        onPress={onPressSave}
                                        styleContainer={styles.buttonSave}
                                    />
                                </View>
                            </View>
                        </SafeAreaView>
                    )
            }

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
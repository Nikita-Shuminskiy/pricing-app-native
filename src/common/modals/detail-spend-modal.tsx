import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Modal} from "native-base";
import SafeAreaView from "../components/safe-area-view";
import {colors} from "../../assets/colors/colors";
import HistoryStore from "../../store/HistoryStore/history-store";
import Ionicons from "react-native-vector-icons/Ionicons";
import {convertToDate, dateFormat, getDateFormatTime} from "../../utils/utils";
import {observer} from "mobx-react-lite";

type DetailSpendModalType = {
    onClose: () => void
    visible: boolean
}
export const DetailSpendModal = observer(({visible, onClose}: DetailSpendModalType) => {
    const {chosenSpend} = HistoryStore
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
                    <View>
                        <View style={styles.blockSpendText}>
                            <Text style={styles.textName}>Имя категории</Text>
                            <Text style={[styles.blockSpendTextValue, {
                                maxWidth: '90%',
                                width: '100%'
                            }]}>{chosenSpend?.title}</Text>
                        </View>
                        <View style={styles.blockSpendText}>
                            <Text style={styles.textName}>Дата</Text>
                            <Text
                                style={styles.blockSpendTextValue}> {dateFormat(convertToDate(chosenSpend?.createdAt))} в {getDateFormatTime(convertToDate(chosenSpend?.createdAt))}</Text>
                        </View>
                        <View style={styles.blockSpendText}>
                            <Text style={styles.textName}>Сумма</Text>
                            <Text
                                style={styles.blockSpendTextValue}>{chosenSpend?.amount} {chosenSpend?.currency}</Text>
                        </View>
                        <View style={styles.blockSpendText}>
                            <Text style={styles.textName}>Коментарий</Text>
                            <Text style={styles.blockSpendTextValue}>{chosenSpend?.description}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: '100%'
    },
    closeIco: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    blockSpendText: {
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 20
    },
    textName: {
        fontSize: 20,
        color: colors.gray,
        marginRight: 10
    },
    blockSpendTextValue: {
        paddingLeft: 10
    },
});

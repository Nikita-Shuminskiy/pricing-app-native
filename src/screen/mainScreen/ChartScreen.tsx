import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {observer} from "mobx-react-lite";
import {PieChart} from "react-native-chart-kit";
import rootStore from "../../store/RootStore/root-store";
import WalletStore from "../../store/WalletStore/wallet-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import {Box, Image} from "native-base";
import {generateColor} from "../../utils/utils";
import filterImage from '../../assets/images/filter.png'
import FilterChartModal from "../../common/modals/filter-chart-modal";

const ChartScreen = observer(() => {
    const {CategoryStoreService} = rootStore
    const {chosenWallet} = WalletStore
    const {chartData, labels, walletChartId} = CategoriesStore
    const [modalFilterChart, setModalFilterChart] = useState(false);
 /*   useEffect(() => {
        CategoryStoreService.getChartData('639e2e063bd3108c8b756de0', '2022')
    }, [])*/
    console.log(chartData)
    const chartConf = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    }
    const onPressFilter = () => {
        setModalFilterChart(true)
    }
    return (
        <>
            <SafeAreaView>
                <Box flex={1} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <Box right={10} position={'absolute'} bottom={10}>
                        <TouchableOpacity onPress={onPressFilter}>
                            <Image alt={'filter for chart'} w={50} height={50} source={filterImage}/>
                        </TouchableOpacity>
                    </Box>
                    <Box flex={1}
                         width={'100%'}
                         alignItems={'center'}
                         justifyContent={'center'}>
                        <PieChart
                            data={chartData}
                            width={320}
                            height={320}
                            chartConfig={chartConf}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[10, 50]}
                            hasLegend={true}
                            absolute={true}
                            avoidFalseZero={true}
                        />
                    </Box>
                </Box>
            </SafeAreaView>
            {modalFilterChart &&
                <FilterChartModal visible={modalFilterChart} onClose={() => setModalFilterChart(false)}/>}
        </>
    );
});

const styles = StyleSheet.create({})

export default ChartScreen;
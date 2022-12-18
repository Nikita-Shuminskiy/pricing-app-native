import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {observer} from "mobx-react-lite";
import {BarChart, LineChart, PieChart, ProgressChart, StackedBarChart} from "react-native-chart-kit";
import rootStore from "../../store/RootStore/root-store";
import WalletStore from "../../store/WalletStore/wallet-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import {ChartData, Dataset} from "react-native-chart-kit/dist/HelperTypes";
import {Box} from "native-base";
import {generateColor} from "../../utils/utils";


const ChartScreen = observer(() => {
    const {CategoryStoreService} = rootStore
    const {chosenWallet} = WalletStore
    const {chartData, labels, walletChartId} = CategoriesStore
      useEffect(() => {
          CategoryStoreService.getChartData('639e2e063bd3108c8b756de0', '2022')
      }, [])
    const category =  chartData && chartData?.map((item, index) => {
        return {
            name: item.label[index],
            population: item?.data[index]?.x,
            color: generateColor(),
            legendFontSize: 15
        }
    })
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
    return (
        <SafeAreaView>
            <Box flex={1}
                 width={'100%'}
                 alignItems={'center'}
                 justifyContent={'center'}>
                <PieChart
                    data={[]}
                    width={220}
                    height={220}
                    chartConfig={chartConf}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 50]}
                    absolute
                />
            </Box>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({})

export default ChartScreen;
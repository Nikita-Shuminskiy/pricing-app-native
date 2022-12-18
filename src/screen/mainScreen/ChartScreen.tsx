import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {observer} from "mobx-react-lite";
import {BarChart} from "react-native-chart-kit";
import rootStore from "../../store/RootStore/root-store";
import WalletStore from "../../store/WalletStore/wallet-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import {ChartData, Dataset} from "react-native-chart-kit/dist/HelperTypes";
import {Box} from "native-base";
import {LineChart} from 'react-native-charts-wrapper';

const ChartScreen = observer(() => {
    const {CategoryStoreService} = rootStore
    const {chosenWallet} = WalletStore
    const {chartData, labels, walletChartId} = CategoriesStore
    /*  useEffect(() => {
          CategoryStoreService.getChartData(walletChartId, '2022')
      }, [])*/
    const data: ChartData = {
        labels: labels,
        datasets: [
            {
                key: '1212121',
                data: [1, 2, 3, 4, 11, 1],
                strokeWidth: 20,
                withDots: true,
                withScrollableDot: true,
                strokeDashOffset: 10,
                strokeDashArray: [1, 1, 1, 1, 1, 1,]
            },
            {
                key: '1212121',
                data: [1, 211, 3, 4, 5, 1],
                strokeWidth: 20,
                withDots: true,
                withScrollableDot: true,
                strokeDashOffset: 10,
                strokeDashArray: [1, 11, 1, 11, 111, 1,]
            },
            {
                key: '1212121',
                data: [1, 2, 3, 4, 5, 111],
                strokeWidth: 20,
                withDots: true,
                withScrollableDot: true,
                strokeDashOffset: 10,
                strokeDashArray: [1, 1, 1, 1, 1, 1,]
            }
        ] as Dataset[],
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <LineChart style={styles.chart}
                           data={{dataSets:[{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
                />
            </View>
      {/*      <Box flex={1}
                 width={'100%'}
                 alignItems={'center'}
                 justifyContent={'center'}>
                 @ts-ignore
                <BarChart
                    data={data}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    yAxisLabel={''}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </Box>*/}
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});

export default ChartScreen;
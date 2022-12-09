import {instance} from './config';
import {AxiosResponse} from 'axios';
import {
    ChartDataType,
    CurrencyType,
    LoadingEnum,
    NewUserType,
    NewWalletType,
    ParamsToChartDate,
    SpendDataType,
    SpendingModel,
    UserType,
    WalletModelType,
} from '../store/Type/models';
import NotificationStore from "../store/NotificationStore/notification-store";

export const walletApi = {
    getWallet(walletId: string, userId: string): Promise<AxiosResponse<WalletModelType>> {
        return instance.get<WalletModelType>(`wallet?walletId=${walletId}&userId=${userId}`);
    },
    getWallets(userId: string): Promise<AxiosResponse<WalletModelType[]>> {
        return instance.get(`wallet/wallets?userId=${userId}`);
    },
    addWallet(newWallet: NewWalletType): Promise<AxiosResponse<any>> {
        const {userId, name, currency, balance} = newWallet;
        return instance.post<any>(`wallet`, {userId, wallet: {name, currency, balance}});
    },
    addSpendToWallet(walletId: string, spendingId: string): Promise<AxiosResponse<SpendingModel>> {
        return instance.post<SpendingModel>('wallet/spending', {walletId, spendingId});
    },
    removeWallet(userId: string, walletId: string): Promise<AxiosResponse<any>> {
        return instance.delete('history/wallet', {data: {userId, walletId}});
    },
    //
    getCurrencyList(): Promise<AxiosResponse<CurrencyType[]>> {
        return instance.get<CurrencyType[]>('wallet/currency-list');
    },
    updateWallet(walletId: string, wallet: WalletModelType): Promise<AxiosResponse<WalletModelType>> {
        return instance.put<WalletModelType>('wallet', {walletId, wallet});
    },
};

export const historyApi = {
    getCurrentHistory(walletId: string): Promise<AxiosResponse<SpendingModel[]>> {
        return instance.get<SpendingModel[]>(`history?walletId=${walletId}`);
    },
    getAllHistory(): Promise<AxiosResponse<SpendingModel[]>> {
        return instance.get<SpendingModel[]>(`history/allUserHistory`);
    },
};

export const chartApi = {
    getChartData(params: ParamsToChartDate): Promise<AxiosResponse<ChartDataType[]>> {
        try {
            return instance.get('chart/getChartData', {
                params: {...params},
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};

export const spendingApi = {
    addSpending(data: SpendDataType): Promise<AxiosResponse<SpendDataType>> {
        return instance.post('history/spending', data);
    },
};

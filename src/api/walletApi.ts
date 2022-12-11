import {AxiosResponse} from "axios";
import {CurrencyType, LoadingEnum, NewWalletType, SpendingModel, WalletModelType} from "../store/Type/models";
import {instance} from "./config";
import NotificationStore from "../store/NotificationStore/notification-store";

export const walletApi = {

    async getWallet(walletId: string, userId: string): Promise<AxiosResponse<WalletModelType>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.get<WalletModelType>(`wallet?walletId=${walletId}&userId=${userId}`);
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
     getWallets(userId: string): Promise<AxiosResponse<WalletModelType[]>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return instance.get(`wallet/wallets?userId=${userId}`);
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
   async addWallet(newWallet: NewWalletType): Promise<AxiosResponse<any>> {
        const {userId, name, currency, balance} = newWallet;
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.post(`wallet`, {userId, wallet: {name, currency, balance}});
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    async addSpendToWallet(walletId: string, spendingId: string): Promise<AxiosResponse<SpendingModel>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.post<SpendingModel>('wallet/spending', {walletId, spendingId});
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    async removeWallet(userId: string, walletId: string): Promise<AxiosResponse<any>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.delete('history/wallet', {data: {userId, walletId}});
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    //
     getCurrencyList(): Promise<AxiosResponse<CurrencyType[]>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return instance.get<CurrencyType[]>('wallet/currency-list');
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    async updateWallet(walletId: string, wallet: WalletModelType): Promise<AxiosResponse<WalletModelType>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.put<WalletModelType>('wallet', {walletId, wallet});
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
};
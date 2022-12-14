import {AxiosResponse} from "axios";
import {CurrencyType, LoadingEnum, NewWalletType, WalletModelType} from "../store/Type/models";
import {instance} from "./config";
import NotificationStore from "../store/NotificationStore/notification-store";

export const walletApi = {

    getWallet(walletId: string, userId: string) {
        return instance.get<WalletModelType>(`wallet?walletId=${walletId}&userId=${userId}`);
    },
    getWallets(userId: string) {
        return instance.get<WalletModelType[]>(`wallet/wallets?userId=${userId}`)
    },
    addWallet(newWallet: NewWalletType) {
        const {userId, name, currency, balance} = newWallet;
        return instance.post(`wallet`, {userId, wallet: {name, currency, balance}});
    },
    async removeWallet(userId: string, walletId: string): Promise<AxiosResponse<any>> {
        try {
            return await instance.delete('history/wallet', {data: {userId, walletId}});
        } catch (e) {
            return e
        }
    },
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
    updateWallet(walletId: string, wallet: WalletModelType): Promise<AxiosResponse<WalletModelType>> {
        return instance.put<WalletModelType>('wallet', {walletId, wallet});

    },
};
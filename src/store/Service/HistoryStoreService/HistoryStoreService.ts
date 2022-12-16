import RootStore from '../../../store/RootStore/root-store';
import {LoadingEnum,} from '../../Type/models';

export class HistoryStoreService {
    rootStore: typeof RootStore;

    constructor(rootStore: typeof RootStore) {
        this.rootStore = rootStore;
    }

    async getCurrentHistory(walletId: string) {
        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.HistoryStore.getCurrentHistory(walletId);
            this.rootStore.Notification.setNotification('success', true);
            await this.rootStore.WalletStore.getWallet(walletId)
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification('error', true, e?.response?.data?.message);
        } finally {
            this.rootStore.Notification.setIsLoading(LoadingEnum.initial)
        }
    }
    async getAllHistory() {
        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.HistoryStore.getAllHistory();
        } catch (e) {
            this.rootStore.Notification.setNotification('error', true, e?.response?.data?.message);
        } finally {
            this.rootStore.Notification.setIsLoading(LoadingEnum.initial)
        }
    }
}

export default HistoryStoreService;

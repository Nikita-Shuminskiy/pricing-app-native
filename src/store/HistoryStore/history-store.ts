import {action, makeObservable, observable} from 'mobx';import {historyApi} from '../../api/api';import {convertToDate} from '../../utils/utils';import {CurrencyType, SpendingModel} from '../Type/models';import {walletApi} from "../../api/walletApi";export class HistoryStore {    selectedWalletHistory: SpendingModel[] | null = null    allCurrencyList: CurrencyType[] | null = null    lastSpendsWallet: SpendingModel[] | null = null    chosenSpend: SpendingModel | null = null    sortSelectedWalletHistory(sortField: string, isUpDirection: boolean): void {        this.selectedWalletHistory = this.selectedWalletHistory?.sort((a, b) => {            if (sortField === 'category') {                if (a.title?.toLowerCase() > b.title?.toLowerCase()) {                    return isUpDirection ? -1 : 1;                }                return isUpDirection ? 1 : -1;            }            if (sortField === 'amount') {                if (+a.amount > +b.amount) {                    return isUpDirection ? -1 : 1;                }                return isUpDirection ? 1 : -1;            }            if (sortField === 'date') {                if (convertToDate(a.createdAt) > convertToDate(b.createdAt)) {                    return isUpDirection ? -1 : 1;                }                return isUpDirection ? 1 : -1;            }            return 0;        });        return;    }    async getCurrencyList(): Promise<void> {        const {data} = await walletApi.getCurrencyList();        this.allCurrencyList = data;    }    async getCurrentHistory(walletId: string) {        const {data} = await historyApi.getCurrentHistory(walletId);        this.selectedWalletHistory = data;        this.lastSpendsWallet = data.sort((a, b) => convertToDate(a.createdAt) > convertToDate(b.createdAt) ? -1 : 1).slice(0, 5)    }    async getAllHistory(): Promise<void> {        const {data} = await historyApi.getAllHistory();        this.selectedWalletHistory = data;    }    setChosenSpend(spend: SpendingModel) {        this.chosenSpend = spend    }    clearSelectedWalletHistory() {        this.selectedWalletHistory = []    }    constructor() {        makeObservable(this, {            selectedWalletHistory: observable,            lastSpendsWallet: observable,            allCurrencyList: observable,            chosenSpend: observable,            getCurrentHistory: action,            sortSelectedWalletHistory: action,            getCurrencyList: action,            getAllHistory: action,            setChosenSpend: action,            clearSelectedWalletHistory: action,        });        this.getCurrentHistory = this.getCurrentHistory.bind(this);        this.getCurrencyList = this.getCurrencyList.bind(this);        this.sortSelectedWalletHistory = this.sortSelectedWalletHistory.bind(this);        this.getAllHistory = this.getAllHistory.bind(this);        this.setChosenSpend = this.setChosenSpend.bind(this);    }}export default new HistoryStore();
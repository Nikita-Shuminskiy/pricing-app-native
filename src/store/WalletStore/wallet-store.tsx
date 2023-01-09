import {walletApi} from '../../api/walletApi';import {action, configure, makeObservable, observable} from 'mobx';import React from 'react';import {NewWalletType, SpendDataType, WalletModelType,} from '../Type/models';import {spendingApi} from "../../api/spendingApi";configure({    enforceActions: "never",})export class WalletStore {    wallets: WalletModelType[] | null = null    userId = '';    chosenWallet: WalletModelType | null = null    setChosenWallet(wallet: WalletModelType) {        this.chosenWallet = wallet    }    clearChosenWallet() {        this.chosenWallet = {} as WalletModelType    }    clearWallets() {        this.wallets = []    }    async addSpending(data: SpendDataType): Promise<void> {        await spendingApi.addSpending(data);    }    setWallet(wallet: WalletModelType): void {        this.wallets?.push(wallet);        return;    }    setWallets(wallets: WalletModelType[]): void {        this.wallets = wallets.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));        return;    }    async getWallet(walletId: string): Promise<void> {        const {data} = await walletApi.getWallet(walletId, this.userId);        this.setChosenWallet(data)    }    async getWallets(userId: string) {        this.userId = userId;        const {data} = await walletApi.getWallets(userId);        this.setWallets(data);    }    addWallet = async (newWallet: NewWalletType) => {        return await walletApi.addWallet(newWallet);    };    async removeWallet(userId: string, walletId: string) {        return await walletApi.removeWallet(userId, walletId);    }    async updateWallet(walletId: string, wallet: WalletModelType) {        return await walletApi.updateWallet(walletId, wallet);    }    constructor() {        makeObservable(this, {            wallets: observable,            chosenWallet: observable,            addSpending: action,            setWallet: action,            setWallets: action,            getWallet: action,            getWallets: action,            addWallet: action,            removeWallet: action,            updateWallet: action,            setChosenWallet: action,            clearChosenWallet: action,            clearWallets: action,        });        this.addSpending = this.addSpending.bind(this);        this.clearWallets = this.clearWallets.bind(this);        this.clearChosenWallet = this.clearChosenWallet.bind(this);        this.setWallet = this.setWallet.bind(this);        this.setWallets = this.setWallets.bind(this);        this.getWallet = this.getWallet.bind(this);        this.getWallets = this.getWallets.bind(this);        this.removeWallet = this.removeWallet.bind(this);        this.updateWallet = this.updateWallet.bind(this);        this.setChosenWallet = this.setChosenWallet.bind(this);    }}export default new WalletStore();
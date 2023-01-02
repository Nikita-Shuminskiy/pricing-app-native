export type UserType = {
    active: boolean;
    avatarImg: string;
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    permission: string;
    updatedAt: string;
    wallets: [];
    __v: number;
    _id: string;
};
export type NewUserType = { email: string; password: string; name: string; lastName: string };

export type CategoryType = {
    _id: string;
    value: string;
    color: string
};

export type WalletModelType = {
    _id: string;
    userId: string;
    icon: string;
    name: string;
    balance: number;
    currency: string;
    totalSpends: number;
    myCategories: Array<CategoryModelType>;
    history: Array<SpendingModel>;
    castCurrency: CurrencyType[];
    createdAt: string;
};

export enum LoadingEnum {
    initial = 'initial',
    fetching = 'fetching',
    success = 'success',
    error = 'error',
    loadingMore = 'loadingMore',
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type CategoryModelType = {
    _id: string;
    value: string;
    amount?: number;
};
export type SpendingModel = {
    amount: number;
    createdAt: string;
    description: string;
    title: string;
    updatedAt: string;
    userId: string;
    walletId: string;
    category: string;
    currency: string;
    _id: string;
};

export type NewWalletType = {
    userId: string;
    name: string;
    balance: number | null;
    currency: string;
};

export type SpendDataType = {
    userId: string;
    walletId: string;
    spending: {
        title: string;
        category: string;
        description: string;
        amount: string;
    };
};

export type ParamsToChartDate = {
    year?: string;
    walletId: string;
    isMobile?: boolean
    month?: string
    typeChart: 'pie' | 'line'
};
export type ChartDataType = {
    chartData: ChartDatasetPieType[],
    date: ChartDataDateType
}
export type ChartDataDateType = {
    year: string,
    month: number
}

export type CurrencyType = {
    value: string;
    _id: string;
};
export type ChartDatasetPieType = {
    name: string,
    population: number,
    color: string,
    legendFontColor: string,
}
export type ChartDatasetLineType = {
    data: number[]
    strokeWidth: 2,
    color: (opacity: number) => string
    key: string
}
import {Alert, AlertButton} from "react-native";

type AlertType = {
    title: string
    message: string,
    buttons: AlertButton[]
}
export const createAlert = ({title, message, buttons}: AlertType) => {
    return Alert.alert(title, message, buttons);
}

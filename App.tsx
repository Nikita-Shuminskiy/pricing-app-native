import {Navigations} from "./src/navigation/navigations";
import * as React from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};
const App = () => {
    return (
        <PaperProvider theme={theme}>
           <Navigations/>
        </PaperProvider>
    );
}

export default App;
import {Navigations} from "./src/navigation/navigations";
import * as React from 'react';
import {NativeBaseProvider} from "native-base";

const App = () => {
    return (
        <NativeBaseProvider>
           <Navigations/>
        </NativeBaseProvider>
    );
}

export default App;
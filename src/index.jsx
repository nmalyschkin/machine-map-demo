import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import { addEvent, loadMachineData, loadMachineInfo } from "./store/actions";
import eventSource from "./eventSource";
import App from "./App";

eventSource((ev) => store.dispatch(addEvent(ev)));

store.dispatch(loadMachineData());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// setInterval(
//     () =>
//         store.dispatch(
//             loadMachineInfo(
//                 ((arr) => arr[Math.floor(Math.random() * arr.length)])(
//                     Object.keys(store.getState().machine.machineData)
//                 )
//             )
//         ),
//     10_000
// );

import store from "./store/index";
import { addEvent, loadMachineData, loadMachineInfo } from "./store/actions";
import eventSource from "./eventSource";

eventSource((ev) => store.dispatch(addEvent(ev)));
store.dispatch(loadMachineData());

setInterval(
    () =>
        store.dispatch(
            loadMachineInfo(
                ((arr) => arr[Math.floor(Math.random() * arr.length)])(
                    Object.keys(store.getState().machine.machineData)
                )
            )
        ),
    10_000
);

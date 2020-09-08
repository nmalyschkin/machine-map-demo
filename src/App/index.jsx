import React from "react";
import { connect } from "react-redux";

import { loadMachineInfo } from "../store/actions";
import { MainLayout, Footer, Map as MapTile } from "./MainLayout";
import MachineMap from "./components/MachineMap";
import MachineList from "./components/MachineList";
import MachineInfo from "./components/MachineInfo";
import LiveEventList from "./components/LiveEventList";

const App = ({ events, machineData, actions }) => {
    const [selectedMachine, selectMachine] = React.useState();
    const resetMachine = React.useCallback(() => selectMachine(undefined), [selectMachine]);

    React.useEffect(() => {
        if (!selectedMachine) return;

        actions.loadMachineInfo(selectedMachine);
    }, [selectedMachine]);

    return (
        <MainLayout>
            <MachineList {...{ machineData, selectMachine, selectedMachine }} />
            <MachineInfo
                {...{
                    resetMachine,
                    selectedMachineData: machineData[selectedMachine],
                    id: selectedMachine,
                }}
            />
            <MachineMap {...{ machineData, selectMachine, selectedMachine }} />
            <LiveEventList {...{ events, selectMachine }} />
        </MainLayout>
    );
};

const mapToState = ({ events, machine: { machineData } }) => ({
    events,
    machineData,
});

const actions = { loadMachineInfo };
const mapToAction = (dispatch) => ({
    actions: Object.fromEntries(
        Object.entries(actions).map(([key, func]) => [key, (...args) => dispatch(func(...args))])
    ),
});

export default connect(mapToState, mapToAction)(App);

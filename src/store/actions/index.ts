export const addEvent = (eventData) => ({
    type: "ADD_EVENT",
    payload: eventData,
});

/**
 * action to load all machine data
 * intended to be called once while initialisation
 */
export const loadMachineData = () => (dispatch, getState) => {
    if (getState().machine.isLoading) return;

    dispatch({ type: "MACHINE_LOADING" });

    return fetch("https://machinestream.herokuapp.com/api/v1/machines")
        .then((data) => data.json())
        .then(({ data }) => {
            dispatch({
                type: "MACHINE_DATA",
                data,
            });
        })
        .catch((error) => {
            console.error("Error while loading machine data", error);
            dispatch({
                type: "MACHINE_DATA_LOAD_FAILED",
                error,
            });
        });
};

/**
 * action to load information about a specific machine
 * intended to be executed once when the information is needed
 */
export const loadMachineInfo = (id) => (dispatch, getState) => {
    const state = getState();
    if (
        state.machine.isLoading ||
        state.machine.machineData[id]?.isLoading ||
        state.machine.machineData[id]?.infoLoaded
    ) {
        return;
    }

    dispatch({ type: "MACHINEINFO_LOADING", machine_id: id });

    return fetch(`https://machinestream.herokuapp.com/api/v1/machines/${id}`)
        .then((data) => data.json())
        .then(({ data }) => {
            dispatch({
                type: "MACHINEINFO_DATA",
                data,
            });
        })
        .catch((error) => {
            console.error("Error while loading machine data", error);
            dispatch({
                type: "MACHINEINFO_DATA",
                data: {
                    error,
                },
            });
        });
};

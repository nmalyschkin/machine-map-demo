export const machine = (state = { machineData: {}, isLoading: false }, action) => {
    switch (action.type) {
        case "ADD_EVENT":
            if (action.payload.machine_id in state.machineData)
                // prepand event to liveEvents
                // TODO: restrict liveEvents to max 10 entries or so
                return {
                    ...state,
                    machineData: {
                        ...state.machineData,
                        [action.payload.machine_id]: {
                            ...state.machineData[action.payload.machine_id],
                            liveEvents: [
                                action.payload,
                                ...state.machineData[action.payload.machine_id].liveEvents,
                            ],
                        },
                    },
                };
            else return state;

        case "MACHINE_LOADING":
            return {
                ...state,
                isLoading: true,
            };

        case "MACHINE_DATA":
            return {
                machineData: action.data.reduce((acc, { id, ...data }) => {
                    acc[id] = { ...data, isLoading: false, liveEvents: [], infoLoaded: false };
                    return acc;
                }, {}),
                isLoading: false,
            };

        case "MACHINE_DATA_LOAD_FAILED":
            return {
                error: action.error,
                isLoading: false,
            };

        case "MACHINEINFO_LOADING":
            return {
                ...state,
                machineData: {
                    ...state.machineData,
                    [action.machine_id]: {
                        ...(state.machineData[action.machine_id] || {}),
                        isLoading: true,
                    },
                },
            };

        case "MACHINEINFO_DATA": {
            const { id, ...data } = action.data;
            return {
                ...state,
                machineData: {
                    ...state.machineData,
                    [id]: {
                        ...(state.machineData[id] || {}),
                        ...data,
                        isLoading: false,
                        infoLoaded: true,
                    },
                },
            };
        }

        case "MACHINEINFO_DATA_ERROR": {
            const { id, ...data } = action.data;
            return {
                ...state,
                machineData: {
                    ...state.machineData,
                    [id]: {
                        ...(state.machineData[id] || {}),
                        ...data,
                        isLoading: false,
                        infoLoaded: false,
                    },
                },
            };
        }

        default:
            return state;
    }
};

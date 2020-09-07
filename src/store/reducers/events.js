export const events = (state = [], action) => {
    switch (action.type) {
        // TODO: start removing event when length exceeds some threshold
        case "ADD_EVENT":
            return [
                {
                    ...action.payload,
                },
                ...state,
            ];
        default:
            return state;
    }
};

import { machine as machineReducer } from "./machine";

describe("machine reducer", () => {
    it("handles MACHINE_DATA", () => {
        const action = {
            type: "MACHINE_DATA",
            data: [
                { id: "1", value: "abc" },
                { id: "2", value: "def" },
            ],
        };

        const prevState = { machineData: {}, isLoading: true };

        const expectedState = {
            machineData: {
                "1": { value: "abc", infoLoaded: false, isLoading: false, liveEvents: [] },
                "2": { value: "def", infoLoaded: false, isLoading: false, liveEvents: [] },
            },
            isLoading: false,
        };

        const nextState = machineReducer(prevState, action);
        expect(nextState).toEqual(expectedState);

        // check for purity
        expect(nextState === expectedState).toBeFalsy();
        expect(nextState.machineData === expectedState.machineData).toBeFalsy();
    });

    describe("handles MACHINEINFO_DATA", () => {
        it.todo("for existing machine");
        it.todo("for not existig machine");
    });

    describe("handles ADD_EVENT", () => {
        it("for existing machine", () => {
            const action = {
                type: "ADD_EVENT",
                payload: {
                    machine_id: "123",
                    state: "finished",
                },
            };

            const prevState = {
                machineData: {
                    "123": {
                        value: "abc",
                        infoLoaded: false,
                        isLoading: false,
                        liveEvents: [{ machine_id: "123", state: "running" }],
                    },
                    "2": { value: "def", infoLoaded: false, isLoading: false, liveEvents: [] },
                },
                isLoading: false,
            };

            const expectedState = {
                machineData: {
                    "123": {
                        value: "abc",
                        infoLoaded: false,
                        isLoading: false,
                        liveEvents: [
                            {
                                machine_id: "123",
                                state: "finished",
                            },
                            { machine_id: "123", state: "running" },
                        ],
                    },
                    "2": { value: "def", infoLoaded: false, isLoading: false, liveEvents: [] },
                },
                isLoading: false,
            };

            const nextState = machineReducer(prevState, action);

            expect(nextState).toEqual(expectedState);

            // check for purity
            expect(nextState === expectedState).toBeFalsy();
            expect(nextState.machineData === expectedState.machineData).toBeFalsy();
            expect(nextState.machineData["123"] === expectedState.machineData["123"]).toBeFalsy();
            expect(
                nextState.machineData["123"].liveEvents ===
                    expectedState.machineData["123"].liveEvents
            ).toBeFalsy();
        });
        it.todo("for not existig machine");
    });
});

import { loadMachineData, loadMachineInfo } from "./index";

beforeEach(() => {
    delete globalThis.fetch;
});

describe("loadMachineData", () => {
    it("runs with expected inputs", async () => {
        const data = {};
        //@ts-ignore
        globalThis.fetch = jest.fn((url) =>
            Promise.resolve({ json: () => Promise.resolve({ data }) })
        );

        const dispatchBuffer = [];
        const dispatchMock = jest.fn((x) => dispatchBuffer.push(x));

        await loadMachineData()(dispatchMock, () => ({ machine: { isLoading: false } }));

        expect(dispatchBuffer).toEqual([
            { type: "MACHINE_LOADING" },
            {
                type: "MACHINE_DATA",
                data,
            },
        ]);
        expect(globalThis.fetch).toHaveBeenCalled();
    });

    it.todo("does not dispatch anything when already loading");
    it.todo("handles error, dispatches error action");
});

describe("loadMachineInfo", () => {
    // mock fetch here
    it("runs with expected inputs", async () => {
        const id = "abc-123";
        const data = {};
        //@ts-ignore
        globalThis.fetch = jest.fn((url) =>
            Promise.resolve({ json: () => Promise.resolve({ data }) })
        );

        const dispatchBuffer = [];
        const dispatchMock = jest.fn((x) => dispatchBuffer.push(x));

        await loadMachineInfo(id)(dispatchMock, () => ({
            machine: { isLoading: false, machineData: {} },
        }));

        expect(dispatchBuffer).toEqual([
            { type: "MACHINEINFO_LOADING", machine_id: id },
            {
                type: "MACHINEINFO_DATA",
                data,
            },
        ]);
        expect(globalThis.fetch).toHaveBeenCalled();
        expect(globalThis.fetch).toBeCalledWith(
            `https://machinestream.herokuapp.com/api/v1/machines/${id}`
        );
    });
    it.todo("does not dispatch anything when already loading or already loaded");
    it.todo("handles error, dispatches error action");
});

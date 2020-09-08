import React from "react";
import styled from "styled-components";

const OverflowContainer = styled.div`
    grid-area: side;
    overflow: auto;
    direction: rtl;

    width: 100%;
    overflow-x: hidden;
`;

const Grid = styled.div`
    display: grid;

    gap: 10px;
    align-items: center;
    justify-items: center;

    padding: 12px;
    background: #eee;
    direction: ltr;
`;

const MachineGrid = styled.div`
    display: grid;

    grid-template-columns: 1fr auto;

    :hover {
        cursor: pointer;
    }
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12),
        0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const withTransformMachineData = (WrappedComponent) => ({
    machineData,
    selectMachine,
    ...restProps
}) => {
    const machines = React.useMemo(
        () =>
            Object.entries(machineData).map(([id, data]) => ({
                id,
                ...data,
                name: id.split("-")[0],
                selectThisMachine: () => selectMachine(id),
            })),
        [machineData]
    );

    return <WrappedComponent {...{ ...restProps, machines, selectMachine }} />;
};

const Machine = ({ name, status, machine_type, selectThisMachine, liveEvents }) => {
    return (
        <MachineGrid onClick={selectThisMachine}>
            <h2>Machine {name}</h2>
            {liveEvents.length ? <p>{liveEvents.length}</p> : <div />}
            <p>
                {status} {machine_type}
            </p>
        </MachineGrid>
    );
};

const Sidebar = ({ machines }) => {
    return (
        <OverflowContainer>
            <Grid>
                {machines.map((x) => (
                    <Machine {...x} key={x.id} />
                ))}
            </Grid>
        </OverflowContainer>
    );
};

export default withTransformMachineData(Sidebar);

import React from "react";
import styled from "styled-components";

const OverflowContainer = styled.div`
    grid-area: side;
    overflow: auto;
    /* direction: rtl; */
    z-index: 1;
    background: #eee;
`;

const Inner = styled.div`
    box-sizing: border-box;

    padding: 12px;

    padding-bottom: 24px;
`;

const MachineTitle = styled.h2`
    margin-top: 12px;
    font-weight: 600;
    font-size: 2em;
`;

const EventStyle = styled.div`
    margin: 8px;
`;

const Event = ({ timestamp, machine_id, id, ...info }) => {
    const [date, longime] = timestamp.split("T");
    const [time] = longime.split(".");
    return (
        <EventStyle>
            <p>
                {date} {time}
            </p>
            {Object.entries(info).map(([key, val]) => (
                <p {...{ key }}>
                    {key} : {val}
                </p>
            ))}
        </EventStyle>
    );
};

const MachineInfo = ({ selectedMachineData, resetMachine, id }) => {
    if (!selectedMachineData) return null;

    const [eventCount, setEventCount] = React.useState(3);

    const {
        status,
        machine_type,
        longitude,
        latitude,
        last_maintenance,
        install_date,
        floor,
        isLoading,
        liveEvents,
        events = [],
        infoLoaded,
    } = selectedMachineData;

    return (
        <OverflowContainer>
            <Inner>
                <button onClick={resetMachine}>{"<"}</button>
                <MachineTitle>Machine {id.split("-")[0]}</MachineTitle>
                <p>{id}</p>
                <hr />
                <p>
                    {status} {machine_type}
                </p>
                <p>lat: {latitude}</p>
                <p>lng: {longitude}</p>
                <p>last maintenance: {last_maintenance.split("T")[0]}</p>
                <p>install date: {install_date}</p>
                {floor && <p>floor: {floor}</p>}

                <hr />
                <p>events</p>
                {events.slice(0, eventCount).map((x) => (
                    <Event {...x} key={x.timestamp} />
                ))}
                {eventCount < events.length && (
                    <button onClick={() => setEventCount(eventCount + 2)}>show more</button>
                )}
                {eventCount !== 3 && <button onClick={() => setEventCount(3)}>reset</button>}

                {!!liveEvents.length && (
                    <>
                        <hr />
                        <p>liveEvents</p>
                        {liveEvents.slice(0, 5).map((x) => (
                            <Event {...x} key={x.timestamp} />
                        ))}
                    </>
                )}
            </Inner>
        </OverflowContainer>
    );
};

export default MachineInfo;

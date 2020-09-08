import React from "react";
import styled from "styled-components";

const OverflowContainer = styled.div`
    background: #eee;
    grid-area: footer;
    overflow: hidden;
    z-index: 1;
`;

const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-auto-flow: row;

    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: 120px;

    justify-items: center;
    align-items: start;

    padding: 12px;
    border-left: 2px solid #ddd;

    gap: 10px;
`;

const EventStyle = styled.div`
    height: 100px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    background: #fff;

    :hover {
        cursor: pointer;
    }

    border-radius: 2px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12),
        0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Event = ({ title, onClick, status }) => {
    return (
        <EventStyle onClick={onClick}>
            <p>Machine {title}</p>
            <p>status {status}</p>
        </EventStyle>
    );
};

const withEvents = (Wrapped) => ({ events, selectMachine }) => {
    const filledEvents = React.useMemo(
        () =>
            events.slice(0, 10).map((ev) => ({
                ...ev,
                title: ev.machine_id.split("-")[0],
                onClick: () => selectMachine(ev.machine_id),
            })),
        [events, selectMachine]
    );

    return <Wrapped events={filledEvents} />;
};

const EventList = ({ events }) => {
    return (
        <OverflowContainer>
            <Grid>
                {events.map((event) => (
                    <Event {...event} key={event.id} />
                ))}
            </Grid>
        </OverflowContainer>
    );
};

export default withEvents(EventList);

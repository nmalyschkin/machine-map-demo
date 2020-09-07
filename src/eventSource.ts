/**
 * @param handleNewEvent
 * @returns {function} cleanup function, to close the event source
 */
export default (handleNewEvent: (event) => {}) => {
    const ws = new WebSocket("ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0");
    ws.onopen = () => ws.send('["1", "1", "events", "phx_join", {}]');

    const clearInt = (() => {
        let counter = 2;
        const interval = setInterval(() => {
            ws.send(`[null, "${counter++}", "phoenix", "heartbeat", {}]`);
        }, 25_000);
        return () => clearInterval(interval);
    })();

    ws.onmessage = (msg) => {
        let data;
        try {
            data = JSON.parse(msg.data);
        } catch (error) {
            // unexpected msg data
            return;
        }

        if (data[2] === "events" && data[3] === "new") handleNewEvent(data[4]);
    };

    return () => {
        clearInt();
        ws.close();
    };
};

import React from "react";
import { Map as GoogleMap, Marker, GoogleApiWrapper } from "../../../3rdparty/google-maps-react";
// fixed a visual bug in google-maps-react that prevented to display the map properly contained

const containerStyle = {
    gridArea: "map",

    position: "relative",
    width: "100%",
    height: "100%",
};

const withCleanMachineData = (WrappedComponent) => ({
    machineData,
    selectMachine,
    ...restProps
}) => {
    const { bounds, markers } = React.useMemo(() => {
        const bounds = new google.maps.LatLngBounds();

        Object.values(machineData).forEach(({ latitude: lat, longitude: lng }) =>
            bounds.extend({ lat, lng })
        );

        const markers = Object.entries(machineData).map(
            ([id, { latitude: lat, longitude: lng, machine_type, status }]) => ({
                key: id,
                name: id,
                title: `${machine_type} ${status}`,
                position: { lat, lng },
                onClick: () => selectMachine(id),
            })
        );

        return { bounds, markers };
    }, [Object.keys(machineData).length]);

    const center = React.useMemo(() => {
        if (!restProps.selectedMachine || !machineData[restProps.selectedMachine]) return;

        const { latitude: lat, longitude: lng } = machineData[restProps.selectedMachine];

        return { lat, lng };
    }, [restProps.selectedMachine]);

    return (
        <WrappedComponent
            {...{ ...restProps, bounds, markers, center: center || bounds.getCenter() }}
        />
    );
};

const MachineMap = ({ bounds, markers, google, center }) => {
    //TODO: display info while initial machine data are being loaded

    return (
        <GoogleMap {...{ center, bounds, google, containerStyle }}>
            {markers.map((x) => (
                <Marker {...x} />
            ))}
        </GoogleMap>
    );
};

export default GoogleApiWrapper({
    apiKey: "",
})(withCleanMachineData(MachineMap));

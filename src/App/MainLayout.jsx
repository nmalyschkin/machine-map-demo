import styled from "styled-components";

export const MainLayout = styled.div`
    display: grid;

    grid-template-rows: 1fr 120px;
    grid-template-columns: 360px 1fr;
    grid-template-areas:
        "side map"
        "side footer";
    height: 100vh;
    width: 100vw;
`;

export const Sidebar = styled.div`
    grid-area: side;
`;

export const Map = styled.div`
    grid-area: map;
`;

export const Footer = styled.div`
    grid-area: footer;
`;

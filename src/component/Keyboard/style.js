import styled from 'styled-components';

const Container = styled.div`
    width: 600px;
    height: 240px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
    padding: 5px;
    border-radius: 1px;
    border: 2px solid #212121;
    opacity: 0.6;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    zoom: ${(props) => props.zoom};

    &:hover {
        opacity: 1;
    }
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(32, 1fr);
    gap: 5px;
`;

const StyledButton = styled.button`
    grid-column: span ${(props) => props.grow};
    background: ${(props) => (props.enable ? '#bfa2db' : '#212121')};
    color: #f2f2f2;
    border: none;
    pointer-events: ${(props) => (props.disable ? 'none' : 'auto')};
    opacity: ${(props) => (props.disable ? '0.5' : '1')};
    user-select: none;
    transition: all 0.1s;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    &:hover {
        color: #c8e3d4;
        transform: scale(1.2);
    }

    &:active {
        background: #bfa2db;
    }
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(32, 1fr);
    gap: 5px;
`;

export { Container, Row, StyledButton, Header };

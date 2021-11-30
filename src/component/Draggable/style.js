import styled from 'styled-components';

const StyledContainer = styled.div.attrs((props) => ({
    style: {
        top: props.top + 'px',
        left: props.left + 'px',
    },
}))`
    width: auto;
    height: auto;
    position: fixed;
`;

export { StyledContainer };

import React from 'react';

import Draggable from '../Draggable';
import { StyledContainer, StyledHeader } from './style';

const Input = (props) => {
    return (
        <Draggable session={props.type}>
            <StyledContainer>
                <StyledHeader draggable></StyledHeader>
                <input type={props.type || 'text'}></input>
            </StyledContainer>
        </Draggable>
    );
};

const TextArea = () => {
    return (
        <Draggable session="textarea">
            <StyledContainer>
                <StyledHeader draggable></StyledHeader>
                <textarea></textarea>
            </StyledContainer>
        </Draggable>
    );
};

export { Input, TextArea };

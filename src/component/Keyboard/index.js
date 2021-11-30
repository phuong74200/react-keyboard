import React, { useState } from 'react';

import Draggable from '../Draggable/index';
import { Container, Row, StyledButton } from './style';

const Button = ({ target, grow, down, value, disable }) => {
    const type = () => {
        target.value += down ? value[0] : value[1];
    };
    return (
        <StyledButton disable={disable ? true : false} grow={grow} onClick={type}>
            {down ? value[0] : value[1]}
        </StyledButton>
    );
};

const UpButton = ({ down, setDown }) => {
    const changeMode = () => {
        setDown(!down);
    };

    return (
        <StyledButton onClick={changeMode} grow={4} enable={!down}>
            ⇧
        </StyledButton>
    );
};

const Pick = ({ setTarget, target, disable, value, down, grow }) => {
    const pick = () => {
        const down = (e) => {
            let node = document.elementFromPoint(e.clientX, e.clientY);
            document.removeEventListener('mousedown', down);
            setTarget(node);
        };
        document.addEventListener('mousedown', down);
    };
    const shake = () => {
        target.animate(
            [
                { transform: 'translate(1px, 1px) rotate(0deg)' },
                { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                { transform: 'translate(-3px, 0px) rotate(1deg)' },
                { transform: 'translate(3px, 2px) rotate(0deg)' },
                { transform: 'translate(1px, -1px) rotate(1deg)' },
                { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                { transform: 'translate(-3px, 1px) rotate(0deg)' },
                { transform: 'translate(3px, 1px) rotate(-1deg)' },
                { transform: 'translate(-1px, -1px) rotate(1deg)' },
                { transform: 'translate(1px, 2px) rotate(0deg)' },
                { transform: 'translate(1px, -2px) rotate(-1deg)' },
            ],
            {
                duration: 500,
            }
        );
    };
    return (
        <StyledButton
            onMouseOver={shake}
            onClick={pick}
            disable={disable ? true : false}
            grow={grow}
            title="pick a input box"
        >
            {down ? value[0] : value[1]}
        </StyledButton>
    );
};

const Backspace = ({ target }) => {
    const back = () => {
        target.value = target.value.slice(0, -1);
    };
    return (
        <StyledButton grow={6} onClick={back}>
            Backspace
        </StyledButton>
    );
};

const Space = ({ target }) => {
    const space = () => {
        target.value += ' ';
    };
    return (
        <StyledButton grow={11} onClick={space}>
            Space
        </StyledButton>
    );
};

const Enter = ({ target }) => {
    const enter = () => {
        target.value += '\n';
    };
    return (
        <StyledButton grow={6} onClick={enter}>
            Enter ⏎
        </StyledButton>
    );
};

const Zoom = ({ zoom, setZoom }) => {
    const zooming = () => {
        setZoom(zoom < 2 ? (zoom += 0.25) : (zoom = 1));
    };
    return (
        <StyledButton grow={4} onClick={zooming}>
            {`${zoom}x`}
        </StyledButton>
    );
};

const KeyBoard = ({ target, setTarget }) => {
    const [down, setDown] = useState(true);
    const [zoom, setZoom] = useState(1);

    const char1 = `qwertyuiop`.split('').map((value) => {
        return (
            <Button
                key={value}
                grow={2}
                down={down}
                value={[value, value.toUpperCase()]}
                target={target}
            ></Button>
        );
    });

    const char2 = `asdfghjkl`.split('').map((value) => {
        return (
            <Button
                key={value}
                grow={2}
                down={down}
                value={[value, value.toUpperCase()]}
                target={target}
            ></Button>
        );
    });

    const char3 = `zxcvbnm`.split('').map((value) => {
        return (
            <Button
                key={value}
                grow={2}
                down={down}
                value={[value, value.toUpperCase()]}
                target={target}
            ></Button>
        );
    });

    return (
        <Draggable top={300} left={300} session="KeyBoard-EN">
            <Container zoom={zoom}>
                <Row draggable>
                    <Pick
                        setTarget={setTarget}
                        target={target}
                        grow={2}
                        down={down}
                        value={['✥', '✥']}
                    ></Pick>
                    <Zoom zoom={zoom} setZoom={setZoom}></Zoom>
                </Row>
                <Row>
                    <Button grow={2} down={down} target={target} value={['`', '~']}></Button>
                    <Button grow={2} down={down} target={target} value={['1', '!']}></Button>
                    <Button grow={2} down={down} target={target} value={['2', '@']}></Button>
                    <Button grow={2} down={down} target={target} value={['3', '#']}></Button>
                    <Button grow={2} down={down} target={target} value={['4', '$']}></Button>
                    <Button grow={2} down={down} target={target} value={['5', '%']}></Button>
                    <Button grow={2} down={down} target={target} value={['6', '^']}></Button>
                    <Button grow={2} down={down} target={target} value={['7', '&']}></Button>
                    <Button grow={2} down={down} target={target} value={['8', '*']}></Button>
                    <Button grow={2} down={down} target={target} value={['9', '(']}></Button>
                    <Button grow={2} down={down} target={target} value={['0', ')']}></Button>
                    <Button grow={2} down={down} target={target} value={['-', '_']}></Button>
                    <Button grow={2} down={down} target={target} value={['=', '+']}></Button>
                    <Backspace target={target}></Backspace>
                </Row>
                <Row>
                    <Button disable grow={3} down={down} value={['Tab', 'Tab']}></Button>
                    {char1}
                    <Button grow={2} down={down} target={target} value={['[', '{']}></Button>
                    <Button grow={2} down={down} target={target} value={[']', '}']}></Button>
                    <Button grow={5} down={down} target={target} value={['\\', '|']}></Button>
                </Row>
                <Row>
                    <UpButton setDown={setDown} down={down}></UpButton>
                    {char2}
                    <Button grow={2} down={down} target={target} value={[';', ':']}></Button>
                    <Button grow={2} down={down} target={target} value={["'", '"']}></Button>
                    <Enter target={target}></Enter>
                </Row>
                <Row>
                    <Button disable grow={5} down={down} value={['Shift', 'Shift']}></Button>
                    {char3}
                    <Button grow={2} down={down} target={target} value={[',', '<']}></Button>
                    <Button grow={2} down={down} target={target} value={['.', '>']}></Button>
                    <Button grow={2} down={down} target={target} value={['/', '?']}></Button>
                    <Button disable grow={7} down={down} value={['Shift', 'Shift']}></Button>
                </Row>
                <Row>
                    <Button disable grow={3} down={down} value={['Ctrl', 'Ctrl']}></Button>
                    <Button disable grow={3} down={down} value={['Alt', 'Alt']}></Button>
                    <Button disable grow={3} down={down} value={['⊞', '⊞']}></Button>
                    <Space target={target}></Space>
                    <Button disable grow={3} down={down} value={['Alt', 'Alt']}></Button>
                    <Button disable grow={3} down={down} value={['⊞', '⊞']}></Button>
                    <Button disable grow={3} down={down} value={['☰', '☰']}></Button>
                    <Button disable grow={3} down={down} value={['Ctrl', 'Ctrl']}></Button>
                </Row>
            </Container>
        </Draggable>
    );
};

export default KeyBoard;

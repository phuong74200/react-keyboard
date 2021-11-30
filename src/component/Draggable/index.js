import React, { useEffect, useRef, useState } from 'react';

import { StyledContainer } from './style';

const LocalStorage = function (name, initValue = {}) {
    if (!name) throw new Error('Invalid name');
    this.name = name;
    if (!localStorage.getItem(name)) localStorage.setItem(name, JSON.stringify(initValue));

    this.get = () => {
        return JSON.parse(localStorage.getItem(name));
    };

    this.set = (value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };
};

const Draggable = (props) => {
    const node = useRef();

    const session = new LocalStorage('draggable');

    const lastSession = session.get()[props.session] || {
        top: props.top || 0,
        left: props.left || 0,
    };

    const [top, setTop] = useState(lastSession.top);
    const [left, setLeft] = useState(lastSession.left);
    session.set({
        ...session.get(),
        [props.session || 'no-name']: lastSession,
    });

    useEffect(() => {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;

        const current = node.current;

        if (current.querySelector('[draggable]')) {
            current.querySelector('[draggable]').onmousedown = (e) => {
                dragMouseDown(e);
            };
        } else {
            current.onmousedown = (e) => {
                dragMouseDown(e);
            };
        }

        const dragMouseDown = (e) => {
            if (e.which === 1) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
        };

        const elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            session.set({
                ...session.get(),
                [props.session || 'no-name']: {
                    top: current.offsetTop - pos2,
                    left: current.offsetLeft - pos1,
                },
            });
            setTop(current.offsetTop - pos2);
            setLeft(current.offsetLeft - pos1);
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    });

    return (
        <StyledContainer ref={node} top={top} left={left}>
            {props.children}
        </StyledContainer>
    );
};

export default Draggable;

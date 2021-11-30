import React, { useState } from 'react';

import { KeyBoard, Input, TextArea, Background } from './component/index';
import './index.css';

function App() {
    const [target, setTarget] = useState(document.createElement('textarea'));

    return (
        <div className="main-view">
            <Background></Background>
            <KeyBoard target={target} setTarget={setTarget}></KeyBoard>
        </div>
    );
}

export default App;

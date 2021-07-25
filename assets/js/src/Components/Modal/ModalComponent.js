import React from 'react';
import LoginComponent from '../Login/LoginComponent';

import './ModalComponent.scss';

function ModalComponent(props) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="ModalComponent">
            <button className="btn btn-primary" type="button" onClick={(e) => setOpen(true)}>Log In</button>

            <div className={open ? 'c-modal open' : 'c-modal'} onClick={(e) => setOpen(false)}>
                <div className="c-modal-content" onClick={(e) => e.stopPropagation()}>
                    <LoginComponent />
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;
import React from 'react';
import LoginComponent from '../Login/LoginComponent';

import './ModalComponent.scss';

function ModalComponent(props) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="ModalComponent">
            <button type="button" onClick={(e) => setOpen(true)}>Continue To Checkout</button>

            <div className={open ? 'modal open' : 'modal'} onClick={(e) => setOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <LoginComponent />
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;
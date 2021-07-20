import React from 'react';
import http from '../../Utils/http';
import modalReducer from '../../Store/order.store';
import '../Modal/ModalComponent.scss';

const classes = {
    li: "list-group-item d-flex justify-content-between align-items-center",
    btn: "btn btn-primary d-flex justify-content-between align-items-center",
    icon: "material-icons-outlined skiptranslate"
};

const orderId = document.querySelector('#orderId').value;

function ModalComponent(props) {
    const [payload, setPayload] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    modalReducer.subscribe(() => {
        setPayload(modalReducer.getState());
        setOpen(true);
    });

    return <div className="ModalComponent">
        <div className={open ? 'c-modal open' : 'c-modal'} onClick={(e) => setOpen(false)}>
            <div className="c-modal-content w-50 h-50" onClick={(e) => e.stopPropagation()}>
                {payload !== null && <form className="d-flex flex-column h-100">
                    <h3 className="mb-3">{payload.label}</h3>
                    <textarea className="form-control flex-grow-1"></textarea>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary">Add To Order</button>
                    </div>
                </form>}
            </div>
        </div>
    </div>
}

function OrderComponent(props) {
    const inputRef = React.useRef();

    const uploadFile = async (files, filetype) => {
        if (files.length > 5) return window.alert('maximum file limit exceeded');

        let formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('type', filetype);

        Array.from(files).forEach(file => {
            formData.append('file', file);
        });

        const response = await http.POST('/upload-file', formData, {});
        window.alert(response.message);
    }

    const openModal = (label) => {
        modalReducer.dispatch({
            type: 'open',
            payload: {
                open: true,
                label: label,
                orderId: orderId
            }
        });
    }

    const listItems = [
        {
            label: 'Logo File',
            action: () => inputRef.current.click()
        },
        {
            label: 'Images To Appear On The Site',
            action: () => inputRef.current.click()
        },
        {
            label: 'Brief Description',
            action: () => openModal('Brief Description')
        },
        {
            label: 'Social Media Links',
            action: () => openModal('Social Media Links')
        },
        {
            label: 'Extra Things You Wish For Us To Include',
            action: () => openModal('Extra Things You Wish For Us To Include')
        },
        {
            label: 'Domain',
            action: () => console.log('do smh')
        },
    ];

    return <div>
        <ModalComponent />
        <ul className="list-group">
            {listItems.map((item, i) =>
                <li className={classes.li} key={i}>
                    <span>{item.label}</span>
                    <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif, image/svg+xml" ref={inputRef} onChange={(e) => uploadFile(e.target.files, i === 0 ? 'logo' : 'image')} multiple />
                    <button className={classes.btn} onClick={item.action}>
                        <span className={classes.icon}>add</span>
                    </button>
                </li>
            )}
        </ul>
    </div>
}

export default OrderComponent;
import React from 'react';
import http from '../../Utils/http';
import orderStore from '../../Store/order.store';

import '../Modal/ModalComponent.scss';

const classes = {
    li: "list-group-item d-flex justify-content-between align-items-center",
    btn: "btn btn-primary d-flex justify-content-between align-items-center",
    icon: "material-icons-outlined skiptranslate fs-6",
    spinner: "spinner-border spinner-border-sm"
};

function ModalComponent(props) {
    const [open, setOpen] = React.useState(false);
    const [val, setVal] = React.useState('');

    const submit = () => {
        setOpen(false);
        props.submit({
            val: val,
            label: props.label,
            index: props.index
        });
        setVal('');
    }

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.label])

    return <div className="ModalComponent">
        <div className={open ? 'c-modal open' : 'c-modal'} onClick={(e) => setOpen(false)}>
            <div className="c-modal-content w-50 h-50" onClick={(e) => e.stopPropagation()}>
                {props.open && <form className="d-flex flex-column h-100">
                    <h3 className="mb-3">{props.label}</h3>
                    <textarea className="form-control flex-grow-1" value={val} onChange={(e) => setVal(e.target.value)}></textarea>
                    <div className="d-flex justify-content-end mt-3">
                        <button type="button" onClick={() => submit()} className="btn btn-primary">Add To Order</button>
                    </div>
                </form>}
            </div>
        </div>
    </div>
}

function OrderComponent(props) {
    const orderId = document.querySelector('#orderId').value;
    const [loaders, setLoaders] = React.useState(new Array(6).fill(false));
    const [payload, setPayload] = React.useState({
        open: false,
        index: 0,
        label: null
    });

    const setLoading = (index, state) => {
        let l = loaders;
        l[index] = state;
        setLoaders([...l]);
    }

    const uploadFile = async (files, filetype, index) => {
        setLoading(index, true);
        if (files.length > 5) return window.alert('maximum file limit exceeded');

        let formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('type', filetype);

        Array.from(files).forEach(file => {
            formData.append('file', file);
        });

        const response = await http.POST('/upload-file', formData, {});

        if (response.success) {
            response.data.map(item => {
                orderStore.dispatch({
                    type: 'update',
                    payload: item
                });
            });
        }

        window.alert(response.message);
        setLoading(index, false);
    }

    const submit = async (payload) => {
        setLoading(payload.index, true);
        const response = await http.POST('/add-file', JSON.stringify({
            value: payload.val,
            orderId: orderId,
            type: payload.label
        }));

        if (response.success) {
            orderStore.dispatch({
                type: 'update',
                payload: response.data
            });
        }

        window.alert(response.message);
        setLoading(payload.index, false);
    }

    return <div>
        <ModalComponent {...payload} submit={submit} />
        <ul className="list-group">
            <li className={classes.li}>
                <span>Logo File</span>
                <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png, image/gif, image/svg+xml"
                    id="upload-logo"
                    onChange={(e) => uploadFile(e.target.files, 'logo', 0)}
                    multiple />

                <button className={classes.btn} onClick={() => document.getElementById('upload-logo').click()}>
                    {!loaders[0] && <span className={classes.icon}>add</span>}
                    {loaders[0] && <div className={classes.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </li>
            <li className={classes.li}>
                <span>Images To Appear On The Site</span>
                <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png, image/gif, image/svg+xml"
                    id="upload-img"
                    onChange={(e) => uploadFile(e.target.files, 'image', 1)}
                    multiple />
                <button className={classes.btn} onClick={() => document.getElementById('upload-img').click()}>
                    {!loaders[1] && <span className={classes.icon}>add</span>}
                    {loaders[1] && <div className={classes.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </li>
            <li className={classes.li}>
                <span>Brief Description</span>
                <button className={classes.btn} onClick={() => setPayload({
                    label: 'Brief Description',
                    index: 2,
                    open: true
                })}>
                    {!loaders[2] && <span className={classes.icon}>add</span>}
                    {loaders[2] && <div className={classes.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </li>
            <li className={classes.li}>
                <span>Social Media Links</span>
                <button className={classes.btn} onClick={() => setPayload({
                    label: 'Social Media Links',
                    index: 3,
                    open: true
                })}>
                    {!loaders[3] && <span className={classes.icon}>add</span>}
                    {loaders[3] && <div className={classes.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </li>
            <li className={classes.li}>
                <span>Extra Things You Wish For Us To Include</span>
                <button className={classes.btn} onClick={() => setPayload({
                    label: 'Extra Things You Wish For Us To Include',
                    index: 4,
                    open: true
                })}>
                    {!loaders[4] && <span className={classes.icon}>add</span>}
                    {loaders[4] && <div className={classes.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </li>
            <li className={classes.li}>
                <span>Domain</span>
                <button className={classes.btn} onClick={() => setPayload({
                    label: 'Domain',
                    index: 5,
                    open: true
                })}>
                    {!loaders[5] && <span className={classes.icon}>add</span>}
                    {loaders[5] && <div className={classes.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
            </li>
        </ul>
    </div>
}

export default OrderComponent;
import { removeCode } from '../../Utils/validators';

import React from 'react';
import http from '../../Utils/http';

import './LoginComponent.scss';

function LoginComponent(props) {
    const [sent, setSent] = React.useState(false);
    const [codes, setCodes] = React.useState([]);
    const [mode, setMode] = React.useState('phone');
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        index: 0,
        value: '',
        code: ''
    });

    const fetchCodes = React.useCallback(async () => {
        const response = await http.GET('/codes');
        if (response.success) {
            setCodes(response.data);
        }
    }, []);

    React.useEffect(() => {
        fetchCodes();
        setFormData({
            index: 0,
            value: '',
            code: ''
        });
    }, [mode]);

    const submit = async () => {
        setLoading(true);

        let data = {
            code: formData.code,
            country: codes[formData.index]
        }

        mode === 'phone'
            ? data["phone"] = formData.value
            : data["email"] = formData.value;

        const response = await http.POST('/login/' + mode, JSON.stringify(data));

        window.alert(response.message);

        if (response.success) {
            window.location.reload();
        } else {
            setFormData({
                index: 0,
                value: '',
                code: ''
            });
            setSent(false);
            setLoading(false);
        }
    }

    const verifyPhone = async () => {
        setLoading(true);
        const response = await http.POST('/verify-phone', JSON.stringify({
            phone: removeCode(formData.value, codes[formData.index].dial_code),
            country: codes[formData.index]
        }));

        window.alert(response.message);

        if (response.success) {
            setSent(true);
        }

        setLoading(false);
    }

    const verifyEmail = async () => {
        setLoading(true);
        const response = await http.POST('/verify-email', JSON.stringify({
            email: formData.value
        }));

        window.alert(response.message);

        if (response.success) {
            setSent(true);
        }

        setLoading(false);
    }

    return (
        <div className="LoginComponent">
            <form className="shadow p-3 mb-5 bg-body rounded">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Log in</h1>
                    <button className="btn btn-secondary" type="button" onClick={() => setMode(mode === 'phone' ? 'email' : 'phone')}>
                        {mode === 'phone' ? 'Login With Email' : 'Login With Phone'}
                    </button>
                </div>

                {mode === 'phone' && (
                    <section className="form-group mb-4">
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                        <div className="d-flex">
                            <select className="form-control w-25 me-3" disabled={sent} onChange={(e) => setFormData({ ...formData, index: e.target.value })}>
                                {codes.map((code, i) => <option value={i} key={i}>{code.dial_code}</option>)}
                            </select>
                            <input
                                className="form-control flex-grow-1"
                                disabled={sent}
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            />
                        </div>
                    </section>
                )}

                {mode === 'email' && (
                    <section className="form-group mb-4">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            className="form-control"
                            placeholder="Email Address"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        />
                    </section>
                )}

                <section className="form-group mb-4">
                    <label className="form-label" htmlFor="code">Verification Code</label>
                    <input
                        className="form-control"
                        disabled={!sent}
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Code"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                </section>

                <p className="py-3">If you don't have an account, an account will automatically be created for you.</p>

                <div className="form-actions d-flex justify-content-end">
                    {!sent && <button className="btn btn-primary" disabled={loading} type="button" onClick={mode === 'phone' ? verifyPhone : verifyEmail}>Send Verification Code</button>}
                    {sent && <button className="btn btn-primary" disabled={loading} type="button" onClick={submit}>Log In</button>}
                </div>
            </form>
        </div >
    );
}

export default LoginComponent;
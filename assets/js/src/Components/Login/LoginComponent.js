import { removeCode } from '../../Utils/validators';

import React from 'react';
import http from '../../Utils/http';

import './LoginComponent.scss';

function LoginComponent(props) {
    const [sent, setSent] = React.useState(false);
    const [codes, setCodes] = React.useState([]);
    const [formData, setFormData] = React.useState({
        index: 0,
        phone: '',
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
    }, []);

    const submit = async () => {
        const response = await http.POST('/login', JSON.stringify({
            phone: removeCode(formData.phone, formData.index),
            code: formData.code,
            country: codes[formData.index].dial_code
        }));

        window.alert(response.message);

        if (response.success) {
            window.location.reload();
        } else {
            setFormData({
                index: 0,
                phone: '',
                code: ''
            });
            setSent(false);
        }
    }

    const verifyPhone = async () => {
        const response = await http.POST('/verify-phone', JSON.stringify({
            phone: removeCode(formData.phone, codes[formData.index].dial_code),
            country: codes[formData.index]
        }));

        window.alert(response.message);

        if (response.success) {
            setSent(true);
        }
    }

    return (
        <div className="LoginComponent">
            <form method="POST" action="/login">
                <h1>Login</h1>

                <section>
                    <label htmlFor="phone">Phone Number</label>
                    <div>
                        <select disabled={sent} onChange={(e) => setFormData({ ...formData, index: e.target.value })}>
                            {codes.map((code, i) => <option value={i} key={i}>{code.dial_code}</option>)}
                        </select>
                        <input
                            disabled={sent}
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </section>

                <section>
                    <label htmlFor="code">Verification Code</label>
                    <input
                        disabled={!sent}
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Code"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                </section>

                <div className="form-actions">
                    {!sent && <button type="button" onClick={verifyPhone}>Log In</button>}
                    {sent && <button type="button" onClick={submit}>Log In</button>}
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
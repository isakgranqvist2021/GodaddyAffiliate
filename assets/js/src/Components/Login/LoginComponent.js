import { removeCode } from '../../Utils/validators';

import React from 'react';
import http from '../../Utils/http';

import './LoginComponent.scss';

function LoginComponent(props) {
    const [sent, setSent] = React.useState(false);
    const [codes, setCodes] = React.useState([]);
    const [mode, setMode] = React.useState('phone');
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
    }, []);

    const submit = async () => {
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
        }
    }

    const verifyPhone = async () => {
        const response = await http.POST('/verify-phone', JSON.stringify({
            phone: removeCode(formData.value, codes[formData.index].dial_code),
            country: codes[formData.index]
        }));

        window.alert(response.message);

        if (response.success) {
            setSent(true);
        }
    }

    const verifyEmail = async () => {
        const response = await http.POST('/verify-email', JSON.stringify({
            email: formData.value
        }));

        window.alert(response.message);

        if (response.success) {
            setSent(true);
        }
    }

    return (
        <div className="LoginComponent">
            <form>
                <h1>
                    <span>Log in</span>
                    <a onClick={() => setMode(mode === 'phone' ? 'email' : 'phone')}>
                        {mode === 'phone' ? 'Login With Email' : 'Login With Phone'}
                    </a>
                </h1>

                {mode === 'phone' && (
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
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            />
                        </div>
                    </section>
                )}

                {mode === 'email' && (
                    <section>
                        <label htmlFor="email">Email Address</label>
                        <input
                            placeholder="Email Address"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        />
                    </section>
                )}

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

                <p>If you don't have an account, an account will automatically be created for you.</p>

                <div className="form-actions">
                    {!sent && <button type="button" onClick={mode === 'phone' ? verifyPhone : verifyEmail}>Log In</button>}
                    {sent && <button type="button" onClick={submit}>Log In</button>}
                </div>
            </form>
        </div >
    );
}

export default LoginComponent;
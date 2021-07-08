import React from 'react';
import VerifyComponent from '../VerifyComponent/VerifyComponent';
import verifyStore from '../../Store/verify.store';
import http from '../../Utils/http';

import './AuthComponent.scss';

function LoginComponent(props) {
    const [mode, setMode] = React.useState('email');
    const authTypeRef = React.useRef();
    const [y, setY] = React.useState(false);
    const formRef = React.useRef();

    const query = React.useCallback(() => {
        const query = new URLSearchParams(window.location.search).get('at');

        if (query === 'phone' || query === 'email') {
            setMode(query);
        }

        setY(true);
    }, [])


    const submit = async () => {
        formRef.current.submit();
    }

    const verifyPhone = async () => {
        const response = await http.POST('/verify-phone', JSON.stringify({
            phone: document.querySelector('[type=tel]').value
        }));

        if (response.success) {
            verifyStore.dispatch({ type: 'toggle' });
        }
    }

    React.useEffect(() => {
        authTypeRef.current.setAttribute('value', mode);

        if (!y) {
            query();
        }
    }, [mode]);


    return (
        <div className="AuthComponent">
            <VerifyComponent submit={submit} />

            <form method="POST" action="/login" ref={formRef}>
                <header>
                    <h1>Login</h1>
                    <button className={`${mode === 'phone' ? 'visible' : 'hidden'}`} onClick={() => setMode('email')} type="button">
                        Sign In With Email
                    </button>
                    <button className={`${mode === 'email' ? 'visible' : 'hidden'}`} onClick={() => setMode('phone')} type="button">
                        Sign In With Phone
                    </button>
                </header>

                <input type="hidden" name="authType" ref={authTypeRef} />

                <section className={`${mode === 'email' ? 'visible' : 'hidden'}`}>
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" name="email" placeholder="Email" />
                </section>

                <section className={`${mode === 'phone' ? 'visible' : 'hidden'}`}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number" />
                </section>

                <section>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" />
                </section>

                <p>Don't have an account? <a href="/register">Register</a></p>

                <button type="button" onClick={mode === 'phone' ? verifyPhone : submit}>Login</button>
            </form>
        </div>
    );
}

export default LoginComponent;
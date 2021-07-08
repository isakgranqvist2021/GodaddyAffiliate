import React from 'react';
import verifyStore from '../../Store/verify.store';
import http from '../../Utils/http';
import './VerifyComponent.scss';

function VerifyComponent(props) {
    const [code, setCode] = React.useState('');
    const [open, setOpen] = React.useState('');

    const submit = async () => {
        const response = await http.PUT('/verify-phone', JSON.stringify({
            token: code
        }));

        window.alert(response.message);

        if (response.success) {
            props.submit();
        }
    }

    const sendCodeAgain = async () => {
        const response = await http.POST('/verify-phone', JSON.stringify({
            phone: document.querySelector('[type=tel]').value
        }));

        window.alert(response.message);
    }

    React.useEffect(() => {
        verifyStore.subscribe(() => {
            setOpen(verifyStore.getState());
        });
    }, []);

    return (
        <div className={`VerifyComponent ${open ? 'open' : 'closed'}`}>
            <form>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={sendCodeAgain}>Send Code Again</button>
                    <button type="button" onClick={submit}>Verify</button>
                </div>
            </form>
        </div>
    );
}

export default VerifyComponent;
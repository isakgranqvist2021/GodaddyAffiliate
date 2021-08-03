import React from 'react';
import http from '../../Utils/http';

function LogoComponent() {
    const [link, setLink] = React.useState(null);
    const [credits, setCredits] = React.useState([]);
    const [showPopup, setShowPopup] = React.useState(false);

    const fetchInfo = React.useCallback(async () => {
        const response = await http.GET('/my-logo-credits');
        if (response.success) {
            setLink(response.data.ssoLink.url);
            setCredits(response.data.credits);
        }
    });

    const remove = async (credit) => {
        if (window.confirm('confirm delete credit?')) {
            const response = await http.POST('/remove-logo-credit', JSON.stringify({ credit }));

            if (response.success) {
                let c = credits;
                c.splice(c.findIndex(c => c.credit === credit), 1);
                setCredits([...c]);
            }
        }
    }

    const copyCredit = (credit) => {
        let copyText = document.getElementById(`credit-${credit}`);
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
        setShowPopup(true);

        window.setTimeout(() => setShowPopup(false), 900);
    }

    React.useEffect(() => {
        fetchInfo();
    }, []);

    if (!link) {
        return <p>Loading...</p>
    }

    if (credits.length <= 0) {
        return <p>You don't have any logo credits</p>
    }

    return <div>
        <h3>Create Your Logo</h3>
        <p className="text-muted" style={{ maxWidth: '50ch' }}>
            Use a credit below in order to claim your logo.
            The logo credit will be entered in the last stage of the logo creation process.
        </p>

        <p className="text-muted" style={{ maxWidth: '50ch' }}>
            When you have used your logo credit you may delete it,
            A logo credit cannot be used twice.
        </p>

        <ul className="list-group mb-3 logo-credits">
            {credits.map((c, i) => {
                return <li key={c} className="list-group-item d-flex justify-content-between">
                    <div title="Copy Code To Clipboard" className="d-flex align-items-center logo-credit">
                        <p className="m-0 d-flex align-items-center" onClick={() => copyCredit(c)}>{c}</p>
                        <input id={'credit-' + c} value={c} className="w-0 h-0 position-absolute" />
                    </div>
                    <span style={{ cursor: 'pointer' }} onClick={() => remove(c)} className="material-icons-outlined skiptranslate">close</span>
                </li>
            })}

            <div className={`clipboard-popup ${showPopup ? 'open' : 'closed'}`}>
                Copied To Clipboard
            </div>
        </ul>

        {
            link !== null && <div className="d-flex justify-content-end">
                <a className="btn btn-success" href={link} target="_blank">Create Logo Now</a>
            </div>
        }

    </div >
}

export default LogoComponent;
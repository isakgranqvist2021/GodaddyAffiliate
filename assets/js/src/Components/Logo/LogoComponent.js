import React from 'react';
import http from '../../Utils/http';

function LogoComponent() {
    const submit = async () => {
        const response = await http.POST('/create-logo', JSON.stringify({
            orderId: document.querySelector('#orderId').value,
            email: document.querySelector('#email-addr').value
        }));

        console.log(response);
    }

    return <div>
        <h3>Create Your Logo</h3>
        <p>Click the button to create your own logo!</p>
        <button class="btn btn-primary" type="button" onClick={submit}>Create Logo Now</button>
    </div>
}

export default LogoComponent;
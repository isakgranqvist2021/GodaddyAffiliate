import React from 'react';
import http from '../../Utils/http';

function LogoComponent() {
    const orderId = document.querySelector('#orderId').value;

    const submit = async () => {
        const response = await http.POST('/create-logo', JSON.stringify({
            orderId: orderId
        }));

        console.log(response);
    }

    return <div>
        <h3>Create Your Logo</h3>
        <button class="btn btn-primary" type="button" onClick={submit}>Create Logo Now</button>
    </div>
}

export default LogoComponent;
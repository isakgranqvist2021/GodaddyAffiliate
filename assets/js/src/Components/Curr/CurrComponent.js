import React from 'react';
import http from '../../Utils/http';
import currStore from '../../Store/curr.store';

function CurrComponent(props) {
    const [data, setData] = React.useState(null);

    const fetchCurrencies = React.useCallback(async () => {
        const response = await http.GET('/currencies');
        if (response.success) {
            setData(response.data);
            currStore.dispatch({
                type: 'set',
                payload: response.data.currency
            });
        }
    }, []);

    const setCurr = async (v) => {
        const response = await http.GET('/set-currency/' + v);

        window.alert(response.message);
        if (response.success) {
            window.location.reload();
        }
    }

    React.useEffect(() => {
        return fetchCurrencies();
    }, [])

    return <div>
        {data !== null &&
            <label className="d-flex align-items-center">
                Currency
                <select className="ms-3 form-control" onChange={(e) => setCurr(e.target.value)} value={data.currency.code}>
                    {data.currencies.map((curr, i) => <option key={i} value={curr.code}>{curr.code}</option>)}
                </select >
            </label>
        }

        {data === null && <p>Loading...</p>}
    </div >
}

export default CurrComponent;
import React from 'react';

function HireComponent(props) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const tabs = 3;

    const submit = (formData) => {
        console.log(formData);
    }

    return (
        <div className="col-12 col-sm-10 col-md-8 h-100 pb-5 min-vh-100">
            <header className="mb-4">
                <h1 className="display-5">{
                    (() => {
                        switch (tabIndex) {
                            case 0: return 'Business Details';
                            case 1: return 'Social Media Links';
                            case 2: return 'Meeting Date';
                            default: return 'Talk To An Expert';
                        }
                    })()
                }</h1>
                {tabIndex === 0 && <p>Before we can assist you we need some extra <br />information from you regarding your business.</p>}
            </header>
            <form onSubmit={(e) => e.preventDefault()} className="w-100 d-flex flex-column justify-content-between">
                <StepperComponent
                    setFormData={setFormData}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />

                <div className="d-flex align-items-center w-100 mt-5">
                    <button className="btn btn-secondary d-flex align-items-center" type="button" disabled={tabIndex === 0} onClick={() => setTabIndex(tabIndex - 1)}>
                        <span className="material-icons-outlined skiptranslate">chevron_left</span>
                        <span>Previous</span>
                    </button>

                    {tabIndex < tabs - 1 ?
                        <button className="btn btn-primary ms-3 d-flex align-items-center" type="button" onClick={() => setTabIndex(tabIndex + 1)}>
                            <span>Next</span>
                            <span className="material-icons-outlined skiptranslate">chevron_right</span>
                        </button> :
                        <button className="btn btn-success ms-3" type="button" onClick={submit}>
                            Submit
                        </button>}
                </div>
            </form>
        </div>
    );
}

function StepperComponent(props) {
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        socialLinks: [],
        phone: '',
        email: '',
        dates: []
    });

    const [socialLink, setSocialLink] = React.useState('');
    const [dates, setDates] = React.useState({
        date: new Date().toISOString().split('T')[0],
        time: "00:00"
    });

    const addDateToList = () => {
        if (formData.dates.map(d => {
            return d.date + d.time
        }).includes(dates.date + dates.time)) {
            return;
        }

        setFormData({
            ...formData,
            dates: [...formData.dates, dates]
        });
    }

    React.useEffect(() => {
        props.setFormData(formData);
    }, [formData]);

    React.useEffect(() => {
        setSocialLink('');
    }, [formData.socialLinks]);

    return (
        <div>
            {props.tabIndex === 0 && (
                <div>
                    <div className="form-group mb-4">
                        <label className="form-label">Name of your business</label>
                        <input className="form-control" value={formData.name} onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="form-group mb-4">
                        <label className="form-label">Brief description of your business</label>
                        <textarea className="form-control" value={formData.description} onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label">Email Address</label>
                        <input className="form-control" value={formData.email} onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" value={formData.phone} onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                </div>
            )}

            {props.tabIndex === 1 && (
                <div>
                    {formData.socialLinks.length > 0 && (
                        <div className="form-group">
                            <ul className="list-group">
                                {formData.socialLinks.map((l, i) =>
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{l}</span>
                                        <span className="material-icons-outlined skiptranslate" style={{ cursor: 'pointer' }} onClick={() => {
                                            let f = formData;
                                            f.socialLinks.splice(i, 1);
                                            setFormData({ ...f });
                                        }}>close</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    <div className="form-group mt-4 d-flex align-items-end">
                        <div className="form-group w-100 me-2">
                            <label className="form-label">Link</label>
                            <input value={socialLink} onChange={(e) => setSocialLink(e.target.value)} className="form-control flex-grow-1 me-3" placeholder="https://facebook.com/my_page" />
                        </div>
                        <button onClick={(e) => setFormData({ ...formData, socialLinks: [...formData.socialLinks, socialLink] })} className="btn btn-primary d-flex justify-content-center align-items-center" type="button">
                            <span className="material-icons-outlined skiptranslate">add</span>
                        </button>
                    </div>
                </div>
            )}

            {props.tabIndex === 2 && (
                <div>
                    <div className="form-group d-flex align-items-end">
                        <div className="form-group me-3 w-100">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" value={dates.date} onChange={(e) => setDates({ ...dates, date: e.target.value })} />
                        </div>
                        <div className="form-group me-3 w-100">
                            <label className="form-label">Time</label>
                            <input type="time" className="form-control" value={dates.time} onChange={(e) => setDates({ ...dates, time: e.target.value })} />
                        </div>
                        <button type="button" onClick={addDateToList} className="btn btn-primary d-flex align-items-center justify-content-center">
                            <span className="material-icons-outlined skiptranslate">add</span>
                        </button>
                    </div>

                    {formData.dates.length > 0 && (
                        <div className="mt-4">
                            <hr />
                            <label className="form-label">Picked Dates</label>
                            <ul className="list-group">
                                {formData.dates.map((d, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="me-1">{d.date}</span>
                                        <span>-</span>
                                        <span className="ms-1">{d.time}</span>
                                    </div>
                                    <span className="material-icons-outlined skiptranslate" style={{ cursor: 'pointer' }} onClick={() => {
                                        let d = formData.dates;
                                        d.splice(i, 1);
                                        setFormData({ ...formData, dates: [...d] });
                                    }}>close</span>
                                </li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default HireComponent;
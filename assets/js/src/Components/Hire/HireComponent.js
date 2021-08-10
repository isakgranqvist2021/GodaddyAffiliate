import React from 'react';
import http from '../../Utils/http';

import './HireComponent.scss';

function HireComponent(props) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const tabs = 3;

    const submit = async () => {
        console.log('submit', formData);

        const response = await http.POST('/create-meeting', JSON.stringify(formData));
        window.alert(response.message);

        if (response.success) {
            window.location.href = '/talk-to-an-expert/exit';
        }
    }   

    return (
        <div className="col-12 col-sm-10 col-md-8 h-100 pb-5 min-vh-100 m-auto" id="hire-component">
            <header>
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
                {tabIndex === 0 && (
                    <p>
                        Before we can assist you we need some 
                        extra information from you regarding your business.
                    </p>
                )}  

                {tabIndex === 1 && (
                    <p>
                        Do you have any social media links that you'd like to have available 
                        on your new website?
                    </p>
                )}  

                {tabIndex === 2 && (
                    <p>
                        Please pick a couple of dates when you're available to discuss the details
                        of your website. We are here to help you!
                    </p>
                )}  
            </header>
            <form onSubmit={(e) => e.preventDefault()} className="w-100 d-flex flex-column justify-content-between">
                <StepperComponent
                    setFormData={(val) => setFormData(val)}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />

                <div className="d-flex align-items-center w-100 mt-5">
                    <button className="btn btn-secondary d-flex align-items-center" type="button" disabled={tabIndex === 0} onClick={() => setTabIndex(tabIndex - 1)}>
                        <span className="material-icons-outlined skiptranslate">chevron_left</span>
                        <span>Previous</span>
                    </button>
                    <button className="btn btn-primary ms-3 d-flex align-items-center" type="button" disabled={tabIndex > tabs - 1} onClick={() => setTabIndex(tabIndex + 1)}>
                        <span>Next</span>
                        <span className="material-icons-outlined skiptranslate">chevron_right</span>
                    </button>
                    <button className="btn btn-success ms-auto d-block" type="button" onClick={() => submit()}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

function StepperComponent(props) {
    const [formData, setFormData] = React.useState({
        businessName: '',
        description: '',
        socialLinks: [],
        phone: '',
        email: '',
        dates: []
    });

    const [socialLink, setSocialLink] = React.useState('');
    const [date, setDate] = React.useState();

    const addDateToList = () => {
        if(formData.dates.includes(date)) return;

        setFormData({
            ...formData,
            dates: [...formData.dates, date]
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
                        <input className="form-control" value={formData.businessName} onChange={(e) =>
                            setFormData({ ...formData, businessName: e.target.value })} />
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
                        <input type="datetime-local" className="form-control me-2" onChange={(e) => setDate(e.target.value)}/>
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
                                        <span className="me-1">{new Date(d).toLocaleString()}</span>
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
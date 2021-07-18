import React from 'react';
import http from '../../Utils/http';
import currStore from '../../Store/curr.store';
import PlaceholderComponent from '../Placeholder/PlaceholderComponent';
import TemplateComponent from '../Template/TemplateComponent';

import './PickComponent.scss';

function PickComponent(props) {
    const formRef = React.useRef();
    const inputRef = React.useRef();
    const [slices, setSlice] = React.useState([]);
    const [curr, setCurr] = React.useState(null);

    const fetchTemplates = React.useCallback(async (tag) => {
        const response = await http.GET(`/find-templates`);

        if (response.success) {
            setSlice(response.data.slice(0, 3));
        }

    }, []);


    const pickTemplate = (id) => {
        inputRef.current.setAttribute('value', id);
        formRef.current.submit();
    }

    React.useEffect(() => {
        fetchTemplates();
        currStore.subscribe(() => {
            setCurr(currStore.getState());
        });
    }, []);

    return (
        <div className="PickComponent" style={{ alignItems: slices.length > 0 ? 'center' : 'unset' }}>
            <form ref={formRef} method="POST" action="/pick-template">
                <input name="template" ref={inputRef} />
            </form>
            <div className="templates">
                {slices.length > 0 && slices.map((template, i) => <TemplateComponent curr={curr} key={i} pickTemplate={pickTemplate.bind(this)} {...template} />)}
                {slices.length <= 0 && new Array(25).fill(0).map((_, i) => <PlaceholderComponent key={i} />)}
            </div>
        </div>
    );
}

export default PickComponent;
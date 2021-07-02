import React from 'react';

function PickTemplate(props) {
    const [templates, setTemplates] = React.useState([
        0, 1, 2, 3, 4, 5, 6, 7
    ]);

    return (
        <div>
            <div className="filter">
                <span>Business</span>
                <span>Casual</span>
                <span>Portfolio</span>
                <span>Blog</span>
                <span>Music</span>
                <span>Fitness</span>
                <span>Beauty & Wellness</span>
                <span>Restaurants & Food</span>
                <span>Other</span>
            </div>
            <div className="templates">
                { templates.map((template, i) => {
                    return <div key={i} className="template"></div>
                })}
            </div>
        </div>
    );
}

export default PickTemplate;
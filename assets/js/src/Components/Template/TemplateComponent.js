import React from 'react';
import http from '../../Utils/http';
import './TemplateComponent.scss';

function TemplateComponent(props) {
    const imagesRef = React.useRef();
    const [selected, setSelected] = React.useState(0);
    const [loading, setLoading] = React.useState(true);


    const calcMarginLeft = (i) => {
        const width = imagesRef.current.getBoundingClientRect().width;
        let negate = selected * width;

        return (i * width) - negate;
    }

    /*
        [
            { position: 400px, }
        ]
    */
    const next = () => {
        if (selected >= props.images.length - 1) return false;
        setSelected(selected + 1);
    }

    const previous = () => {
        if (selected === 0) return false;
        setSelected(selected - 1);
    }

    React.useEffect(() => {
        setLoading(false);
    }, [imagesRef.current]);

    return (
        <div className="TemplateComponent">
            <div className="images" ref={imagesRef}>
                {selected !== 0 && <div className="previous" onClick={previous}>
                    <span className="material-icons-outlined">chevron_left</span>
                </div>}
                {!loading && props.images.map((img, i) => <img
                    src={`${http.serverAddr}/uploads/${img}`}
                    key={i}
                    alt="Website Preview"
                    style={{ transform: `translateX(${calcMarginLeft(i)}px)` }}
                />)}
                {selected !== props.images.length - 1 && <div className="next" onClick={next}>
                    <span className="material-icons-outlined">chevron_right</span>
                </div>}
            </div>

            <div className="body">
                <h2>{props.title}</h2>

                <button onClick={() => props.pickTemplate(props._id)}>
                    <span>Pick Template</span>
                </button>
            </div>
        </div>
    );
}

export default TemplateComponent;
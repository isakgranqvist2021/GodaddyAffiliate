import React from 'react';
import http from '../../Utils/http';
import {
    initialTag,
    initialCreateTemplateState
} from '../../Utils/initial-states';
import './CreateComponent.scss';

function CreateComponent(props) {
    const uploadRef = React.useRef('');
    const [tags, setTags] = React.useState([]);
    const [tag, setTag] = React.useState(initialTag);
    const [formData, setFormData] = React.useState(initialCreateTemplateState);
    const [loading, setLoading] = React.useState(true);
    const [dnd, setDnd] = React.useState(false);
    const [mode, setMode] = React.useState('create');

    const upload = async (files) => {
        if (files.length <= 0) return;

        setLoading(true);
        let fd = new FormData();
        Array.from(files).forEach(file => fd.append('file', file));

        try {
            const response = await http.POST('/upload', fd, {});

            if (response.success && response.data.length > 0) {
                setFormData({ ...formData, images: [...formData.images, ...response.data] });
                uploadRef.current.value = null;
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    }

    const fetchExisting = React.useCallback(async () => {
        const response = await http.GET('/get-template/' + document.getElementById('tid').value);
        setFormData({
            ...formData,
            ...response.data
        });
        setMode('update');
    });

    const fetchTags = React.useCallback(async () => {
        const response = await http.GET('/tags');

        if (response.success) {
            setTags(response.data);
            setLoading(false);
        }
    });

    const removeImage = (img) => {
        let fd = formData;
        fd.images.splice(fd.images.indexOf(img), 1);

        setFormData({
            ...fd,
            removedImages: [...formData.removedImages, img]
        });
    }

    const create = async () => {
        try {
            const response = await http.POST('/create-template', JSON.stringify(formData));

            window.alert(response.message);

            if (response.success) {
                setFormData(initialCreateTemplateState);
            }

        } catch (err) {
            window.alert('an error has occured');
        }
    }

    const update = async () => {
        try {
            const response = await http.PUT('/update-template', JSON.stringify(formData));

            window.alert(response.message);

            if (response.success) {
                window.location.href = '/admin/view-templates'
            }

        } catch (err) {
            window.alert('an error has occured');
        }
    }

    const dragEvent = (e, type) => {
        e.preventDefault();

        switch (type) {
            case 'enter': return setDnd(true);
            case 'over': return setDnd(true);
            case 'leave': return setDnd(false);
            case 'drop':
                upload(Array.from(e.dataTransfer.files).filter(file => {
                    return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                }));
                setDnd(false);
                break;
        }
    }

    React.useEffect(() => {
        if (window.location.href !== '/admin/create-template') {
            fetchExisting();
        }

        fetchTags();
    }, []);

    return (
        <div className="CreateComponent">
            {loading && <div className="spinner"></div>}
            <form>
                <section className="form-group mb-4">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input className="form-control" disabled={loading} type="text" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </section>

                <section className="form-group mb-4">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea className="form-control" disabled={loading} type="text" id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                </section>

                <div className="d-flex">
                    <section className="form-group mb-4 w-100 me-3">
                        <label className="form-label" htmlFor="price">Price</label>
                        <input className="form-control" disabled={loading} type="number" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    </section>

                    <section className="form-group mb-4 w-100 ms-3">
                        <label className="form-label" htmlFor="service">Service</label>
                        <select className="form-control" disabled={loading} type="text" id="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                            <option value="WordPress">WordPress</option>
                            <option value="Shopify">Shopify</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </section>
                </div>

                <section className="form-group mb-4">
                    <label className="form-label" htmlFor="tags">Tags</label>
                    <div className="d-flex">
                        <select className="form-control flex-grow-1 me-4" disabled={loading} value={tag} onChange={(e) => setTag(e.target.value)}>
                            {tags.map((tag, i) => <option key={i} value={tag}>{tag}</option>)}
                        </select>
                        <button className="btn btn-primary text-nowrap" disabled={loading} type="button" onClick={() => setFormData({
                            ...formData,
                            tags: Array.from(new Set([...formData.tags, tag]))
                        })}>Add Tag</button>
                    </div>

                    {formData.tags.length > 0 &&
                        <div className="tags mt-4">
                            <div className="btn-group" role="group">
                                {formData.tags.map((tag, i) => <button type="button" className="btn btn-outline-primary" key={i} onClick={() => {
                                    let fd = formData;
                                    fd.tags.splice(fd.tags.indexOf(tag), 1);
                                    setFormData({
                                        ...fd
                                    });
                                }}>{tag}</button>)}
                            </div>
                        </div>
                    }
                </section>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <label className="form-label">
                        <span className="me-4">Active (users can buy this)</span>
                        <input disabled={loading} type="checkbox" value={formData.active} checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                    </label>
                    <button disabled={loading} type="button" className="btn btn-primary" onClick={mode === 'create' ? create : update}>
                        {mode === 'create' ? 'Create Template' : 'Update Template'}
                    </button>
                </div>

                <hr className="my-5" />

                <section className="form-group file-upload mb-4">
                    <div
                        className={`${dnd ? 'uploader active' : 'uploader'}`}
                        onClick={(e) => uploadRef.current.click()}
                        onDragEnter={(e) => dragEvent(e, 'enter')}
                        onDragOver={(e) => dragEvent(e, 'over')}
                        onDragLeave={(e) => dragEvent(e, 'leave')}
                        onDrop={(e) => dragEvent(e, 'drop')}>
                        <span className="material-icons-outlined text-muted skiptranslate" style={{ fontSize: '5rem' }}>file_upload</span>
                    </div>
                    <input disabled={loading} type="file" id="upload" accept="image/jpg, image/jpeg, image/png" onChange={(e) => upload(e.target.files)} ref={uploadRef} multiple />
                </section>
                <div className="uploaded-files">
                    {
                        formData.images.map((img, i) =>
                            <img
                                title="Remove Image"
                                onClick={(e) => removeImage(img)}
                                key={i}
                                src={img}
                                alt="Uploaded Image"
                            />)
                    }
                </div>
            </form>
        </div>
    )
}

export default CreateComponent;
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

    React.useEffect(() => {
        fetchTags();
    }, []);

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

    const submit = async () => {
        try {
            const response = await http.POST('/create-template', JSON.stringify(formData));

            if (response.success) {
                setFormData(initialCreateTemplateState);
            }

        } catch (err) {
            // handle error
            console.log(err);
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

    return (
        <div className="CreateComponent">
            {loading && <div className="spinner"></div>}
            <form>
                <section>
                    <label htmlFor="title">Title</label>
                    <input disabled={loading} type="text" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </section>

                <section>
                    <label htmlFor="description">Description</label>
                    <textarea disabled={loading} type="text" id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                </section>

                <section>
                    <label htmlFor="price">Price</label>
                    <input disabled={loading} type="number" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                </section>

                <section>
                    <label htmlFor="service">Service</label>
                    <select disabled={loading} type="text" id="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                        <option value="WordPress">WordPress</option>
                        <option value="Shopify">Shopify</option>
                        <option value="Custom">Custom</option>
                    </select>
                </section>

                <section className="file-upload">
                    <label htmlFor="upload">Images</label>
                    <div
                        className={`${dnd ? 'uploader active' : 'uploader'}`}
                        onClick={(e) => uploadRef.current.click()}
                        onDragEnter={(e) => dragEvent(e, 'enter')}
                        onDragOver={(e) => dragEvent(e, 'over')}
                        onDragLeave={(e) => dragEvent(e, 'leave')}
                        onDrop={(e) => dragEvent(e, 'drop')}>
                        <span className="material-icons-outlined">file_upload</span>
                        <p>Drop Files Here Or Click To Select Files</p>
                    </div>
                    <input disabled={loading} type="file" id="upload" accept="image/jpg, image/jpeg, image/png" onChange={(e) => upload(e.target.files)} ref={uploadRef} multiple />
                </section>

                <section>
                    <label htmlFor="tags">Tags</label>
                    <div className="row">
                        <select disabled={loading} value={tag} onChange={(e) => setTag(e.target.value)}>
                            {tags.map((tag, i) => <option key={i} value={tag}>{tag}</option>)}
                        </select>
                        <button disabled={loading} type="button" onClick={() => setFormData({
                            ...formData,
                            tags: Array.from(new Set([...formData.tags, tag]))
                        })}>Add Tag</button>
                    </div>

                    {formData.tags.length > 0 &&
                        <div className="tags">
                            {formData.tags.map((tag, i) => <span key={i} onClick={() => {
                                let fd = formData;
                                fd.tags.splice(fd.tags.indexOf(tag), 1);
                                setFormData({
                                    ...fd
                                });
                            }}>{tag}</span>)}
                        </div>
                    }
                </section>

                <section>
                    <label>
                        Active (users can buy this immediately)
                        <input disabled={loading} type="checkbox" value={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                    </label>
                </section>

                <div className="images">
                    {
                        formData.images.map((img, i) =>
                            <img
                                title="Remove Image"
                                onClick={(e) => removeImage(img)}
                                key={i}
                                src={`${http.serverAddr}/uploads/${img}`}
                                alt="Uploaded Image"
                            />)
                    }
                </div>

                <button disabled={loading} type="button" className="submit-template" onClick={submit}>Create Template</button>
            </form>
        </div>
    )
}

export default CreateComponent;
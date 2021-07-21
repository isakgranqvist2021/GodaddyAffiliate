import React from 'react';
import http from '../../Utils/http';
import orderStore from '../../Store/order.store';


function FilesComponent(props) {
    const orderId = document.querySelector('#orderId').value;
    const [files, setFiles] = React.useState([]);

    const fetchFiles = React.useCallback(async () => {
        const response = await http.GET('/order-files/' + orderId);
        if (response.success) {
            setFiles(response.data);
        }
    }, []);

    const remove = async (id, i) => {
        if (window.confirm('remove file?')) {
            const response = await http.POST('/remove-file', JSON.stringify({
                file: id,
                orderId: orderId
            }));

            window.alert(response.message);

            if (response.success) {
                let f = files;
                f.splice(i, 1);
                setFiles([...f]);
            }
        }
    }

    orderStore.subscribe(() => {
        let f = files;
        f.push(orderStore.getState());
        setFiles([...f])
    });

    React.useEffect(() => {
        fetchFiles();
    }, []);

    return <div>
        <ul className="list-group">
            {files.map((file, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <span className="text-capitalize me-4">{file.type}</span>
                    <a href={'/uploads/' + file.filename} target="_blank">{file.filename}</a>
                </div>
                <button className="btn btn-outline-danger d-flex justify-content-center align-items-center" onClick={() => remove(file._id, i)}>
                    <span className="material-icons-outlined skiptranslate fs-6">delete</span>
                </button>
            </li>)}
        </ul>
    </div>
}

export default FilesComponent;
import React from 'react';
import http from '../../Utils/http';
import orderStore from '../../Store/order.store';

const orderId = document.querySelector('#orderId').value;

function FilesComponent(props) {
    const [files, setFiles] = React.useState([]);

    const fetchFiles = React.useCallback(async () => {
        const response = await http.GET('/order-files/' + orderId);
        if (response.success) {
            setFiles(response.data);
        }
    }, []);

    const remove = async (id, i) => {
        if (window.confirm('remove file?')) {
            let f = files;
            f.splice(i, 1);
            setFiles([...f]);

            const response = await http.GET('/remove-file/' + id);
            window.alert(response.message);
        }
    }

    orderStore.subscribe(() => {
        let f = files;
        f.push(orderStore.getState());

        console.log(f);

        setFiles([...f])
    });

    React.useEffect(() => {
        fetchFiles();
    }, []);

    return <div>
        <ul className="list-group">
            {files.map((file, i) => <li key={i} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onClick={() => remove(file._id, i)}>
                <div>
                    <span className="d-block">{new Date(file.createdAt).toLocaleString()}</span>
                    <span className="d-block text-capitalize">{file.type}</span>
                </div>
                <div>
                    <span>{file.filename}</span>
                </div>
            </li>)}
        </ul>
    </div>
}

export default FilesComponent;
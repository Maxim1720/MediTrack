// import 'bootstrap';

export default function Error({message}) {
    return (
        <div>
            <div id="error-msg" className="alert alert-danger alert-dismissible">
                <strong>{message}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert"/>
            </div>

        </div>

    );
}
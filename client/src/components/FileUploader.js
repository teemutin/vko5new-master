import React, {useRef} from 'react'
//src https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

const FileUploader = ({onFileSelect}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        //onFileSelectSuccess(file);
      };

    return (
        <div className="container">
                <div className="row">
                    <form>
                        <h3>React File Upload</h3>
                        <div className="form-group">
                            <input type="file" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
export default FileUploader


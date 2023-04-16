import React, { useState, useRef } from 'react';

import {
    FileUploaderContainer,
    FormField,
    DragDropText,
    UploadFileButton,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel
} from './FileUploader.styled';


const MAX_FILE_SIZE = 500000;

const convertBytesToKB = bytes => Math.round(bytes / 1000);

const FileUploader = ({
    label,
    maxFileSize = MAX_FILE_SIZE,
    cb,
    ...props
}) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});

    const handleClick = event => {
        event.preventDefault();
        fileInputField.current.click();
    };

    return (<>
        <FileUploaderContainer>
            <InputLabel>{label}</InputLabel>
            <DragDropText> Drag & Drop ваши тесты, или </DragDropText>
            <UploadFileButton
                type='button'
                onClick={handleClick}
            >
                <i className='fas fa-file-upload' />
                <span> Загрузить {props.multiple ? 'файлы' : 'файл'} </span>
            </UploadFileButton>
            <FormField
                type='file'
                ref={fileInputField}
                onChange={event => setFiles(event.value)}
                {...props}
            />
        </FileUploaderContainer>
        <FilePreviewContainer>
            <PreviewList>
                {Object.keys(files).map((fileName, index) => {
                    let file = files[fileName];
                    let isImageFile = file.type.split('/')[0] === 'image';
                    return (
                        <PreviewContainer key={fileName}>
                            <div>
                                {isImageFile ? (
                                    <ImagePreview
                                        src={URL.createObjectURL(file)}
                                        alt={`file preview ${index}`}
                                    />
                                ) : (
                                    <p>{fileName}</p>
                                )}
                                <FileMetaData isImageFile={isImageFile}>
                                    <span>{file.name}</span>
                                    <aside>
                                        <span>{convertBytesToKB(file.size)} kb</span>
                                        <RemoveFileIcon
                                            className='fas fa-trash-alt'
                                        />
                                    </aside>
                                </FileMetaData>
                            </div>
                        </PreviewContainer>
                    );
                })}
            </PreviewList>
        </FilePreviewContainer>
    </>);
}

export default FileUploader;

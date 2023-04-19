import React from 'react';
import Dropzone from 'react-dropzone';
import { DragDropText, FileUploaderContainer } from './FileUploader.styled';

const MyDropzone = ({onDrop}) => {
    return (
        <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps, isDragActive}) => (
                <FileUploaderContainer>
                    <div {...getRootProps()}
                        style={{width: '100%', cursor: 'pointer'}}
                    >
                        <input {...getInputProps()} />
                        <DragDropText>
                            {isDragActive
                                ? 'Drop ваши тесты'
                                : 'Drag & Drop ваши тесты'
                            }
                        </DragDropText>
                    </div>
                </FileUploaderContainer>
            )}
        </Dropzone>
    );
};

export default MyDropzone;

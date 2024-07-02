import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Header from "../Dashboard/Header";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "../../styles/FunctionalReq.css";
import FileUpload from "./FileUpload";

const projectId = '1';  // Hardcoded project ID

const Elicitation = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [files, setFiles] = useState([]);
    const [placeholderText, setPlaceholderText] = useState("A space to gather all functional requirements - You can tag the others here");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchElicitation = async () => {
            try {
                const endpoint = `/api/elicitation/${projectId}`;
                console.log(`Fetching from endpoint: ${endpoint}`);
                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    console.log('Elicitation not found (empty response), creating new one');

                    const newElicitation = {
                        project: projectId,
                        freeText: "",
                    };

                    console.log('Request Body for Creating New Elicitation:', JSON.stringify(newElicitation));

                    const createResponse = await fetch('/api/elicitation/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newElicitation)
                    });

                    if (!createResponse.ok) {
                        throw new Error('Failed to create elicitation');
                    }

                    const createdData = await createResponse.json();
                    const contentState = convertFromRaw(JSON.parse(createdData.freeText));
                    setEditorState(EditorState.createWithContent(contentState));
                    setPlaceholderText('');

                } else {
                    const contentState = convertFromRaw(JSON.parse(data.freeText));
                    setEditorState(EditorState.createWithContent(contentState));
                    setPlaceholderText('');
                    setFiles(data.files);
                }

            } catch (error) {
                console.error('Error fetching elicitation:', error);
            }
        };

        fetchElicitation();
    }, [projectId]);

    const handleChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleSave = async () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = JSON.stringify(convertToRaw(contentState));
        const requestBody = { project: projectId, freeText: rawContent };

        console.log('Request Body:', requestBody);

        try {
            const response = await fetch('/api/elicitation/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                console.log('Text saved successfully');
            } else {
                console.error('Failed to save text');
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };

    return (
        <Container>
            <Header title="Elicitation" />
            <div className="fr-button-container">
                <Button onClick={handleSave}>Update</Button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="white-box">
                <div className="white-box-content">
                    <Editor
                        editorState={editorState}
                        onChange={handleChange}
                        placeholder={placeholderText}
                    />
                </div>
            </div>
            <FileUpload files={files} setFiles={setFiles} projectId={projectId} />
        </Container>
    );
};

export default Elicitation;

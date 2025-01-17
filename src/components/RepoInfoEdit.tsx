import React, {useEffect, useState} from "react";
import {Repo} from "../types/RepoType.ts";
import {updateRepo} from "../store/repoSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import Button from "./Button.tsx";

interface RepoInfoEditProps {
    repo: Repo;
    onClose: () => void;
    setIsEditing: (isEditing: boolean) => void;
}

const RepoInfoEdit: React.FC<RepoInfoEditProps> = ({ repo , onClose, setIsEditing}) => {

    const dispatch = useDispatch<AppDispatch>();

    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    useEffect(() => {
        setEditedName(repo.name);
        setEditedDescription(repo.description || '');
    }, [repo]);

    const handleSave = () => {
        if (editedName.trim() === '' || editedDescription.trim() ==='') {
            alert('Редактируемые поля не могут быть пустым.');
            return;
        }

        if (repo) {
            const updatedRepo = {
                ...repo,
                name: editedName,
                description: editedDescription,
            };
            dispatch(updateRepo(updatedRepo));
            onClose();
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedName(repo?.name || '');
        setEditedDescription(repo?.description || '');
    };

    return (
        <div>
            <h2>Редактирование Репозитория</h2>
            <div style={{marginBottom: '10px'}}>
                <label>
                    Название:
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        autoFocus
                    />
                </label>
            </div>
            <div style={{marginBottom: '10px'}}>
                <label>
                    Описание:
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        style={{width: '100%', padding: '8px', marginTop: '5px'}}
                        rows={4}
                    />
                </label>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                <Button
                    onClick={handleCancelEdit}
                    color="#6c757d"
                >
                    Отмена
                </Button>
                <Button
                    onClick={handleSave}
                    color="#0366d6"
                >
                    Сохранить
                </Button>
            </div>
        </div>
    );
}

export default RepoInfoEdit;
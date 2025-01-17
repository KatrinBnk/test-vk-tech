import React from 'react';
import { Repo } from '../types/RepoType';
import Button from "./Button.tsx";

interface RepoCardProps {
    repo: Repo;
    onDetails: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onDetails }) => {
    return (
        <div style={styles.card}>
            <h3>{repo.name}</h3>
            <p>{repo.description ? (repo.description.length > 100 ? `${repo.description.slice(0, 100)}...` : repo.description) : 'Нет описания.'}</p>
            <p>Владелец: {repo.owner.login}</p>
            <Button onClick={onDetails}>
                Подробнее
            </Button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '10px',
        width: '100%',
    }
};

export default RepoCard;

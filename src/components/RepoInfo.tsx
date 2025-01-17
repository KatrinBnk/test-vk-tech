import {Repo} from "../types/RepoType.ts";
import Button from "./Button.tsx";

interface RepoCardProps {
    repo: Repo;
    onEdit: () => void;
    onDelete: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({repo, onEdit, onDelete}) => {
    return (
        <div>
            <h2>{repo.name}</h2>
            <p>
                <strong>Владелец:</strong> {repo.owner.login} ({repo.owner.type})
            </p>
            <p>
                <strong>Описание:</strong> {repo.description || 'Нет описания.'}
            </p>
            <p>
                <strong>Звезды:</strong> {repo.stargazers_count}
            </p>
            <p>
                <strong>Форки:</strong> {repo.forks}
            </p>
            <p>
                <strong>Темы:</strong> {repo.topics.length > 0 ? repo.topics.join(', ') : 'Нет тем'}
            </p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                Посмотреть на GitHub
            </a>
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                <Button onClick={onEdit}>
                    Редактировать
                </Button>

                <Button
                    onClick={onDelete}
                    color="#ff0000"
                >
                    Удалить
                </Button>

            </div>
        </div>
    );
}

export default RepoCard;
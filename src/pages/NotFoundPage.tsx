import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import Button from "../components/Button.tsx";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Страница не найдена</p>
            <Button
                onClick={handleGoHome}
                 color="#666"
            >
                Вернуться на главную страницу
            </Button>
        </div>
    );
};

export default NotFoundPage;
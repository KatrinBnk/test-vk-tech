import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color = '#0366d6' }) => {
    return (
        <button
            onClick={onClick}
            className={styles.button}
            style={{
                backgroundColor: color, //основной цвет кнопочки
            }}
        >
            {children}
        </button>
    );
};

export default Button;

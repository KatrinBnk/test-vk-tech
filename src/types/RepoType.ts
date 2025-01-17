export interface Repo {
    id: number;
    name: string; // Название
    description: string; // Описание
    owner: {
        login: string; // Ник владельца
        type: string; // Тип владельца (User или Organization)
    };
    html_url: string; // Ссылка
    stargazers_count: number; // Звезды на репо
    topics: string[]; // Темы
    forks: number;
}
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import Button from "../components/Button.tsx";
import {Collapse, CollapseProps} from "antd";

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Описание задания',
        children: <>
            <p>
                Необходимо получить с сервера и отобразить список элементов. Список должен поддерживать бесконечный
                плавный скролл, постепенную подгрузку элементов, локальное удаление и редактирование.
            </p>
            <p>
                Был использован официальный API от github для получения списка репозиториев
            </p>
            <p>
                В качестве параметров поиска была реализована возможность передачи: запроса, языка, лицензии, даты
                создания (после какой даты создания искать). Фактически параметров для поиска существует больше,
                но в данной задаче они не были использованы.
            </p>
        </>,
    },
    {
        key: '2',
        label: 'Использованные технологии',
        children: <>
            <ul>
                <li>React (vite для сборки)</li>
                <li>TypeScript</li>
                <li>Ant Design</li>
                <li>Jest + React Testing Library</li>
                <li>CSS-модули</li>
                <li>Redux (для стора)</li>
            </ul>

            <div>
                <p>
                    Использовала Ant Design для создания некоторых компонентов (например, на этой странице для реализации Collapse),
                    так же для примера создала похожие компоненты (Button, Modal).
                    В условиях к заданию было указано использовать любой UI Framework, рекомендовано Ant Design, для отображения списка элементов.
                </p>
                <ul>
                    Ant Design был выбран по следующи причинам:
                    <ul>
                        <li>Огромнейший набор готовых компонентов, что позволяет значительно ускорить разработку.</li>
                        <li>Хорошая и максимально подробная документация, что облегчает поиск решений и примеров.</li>
                    </ul>
                </ul>
                <p>
                    Также использовались Jest и React Testing Library, для тестирование корректности работы некоторых
                    компонентов приложения.
                </p>
                <p>
                    Для реализации стора приложения был использован Redux, так как одно из самых популярных и
                    удобных решений, а также я имела опыт работы с этим инструментом
                </p>
                <p>
                    Для элементов списка (репозиториев) была реализована возможность редактирования
                    (разрешено редактирование полей название и описание репозитория) и удаления найденных репозиториев.
                </p>
            </div>
        </>,
    }
];

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [searchParams, setSearchParams] = useState<{ [key: string]: string }>({});

    const handleSearchEnabled = useCallback((enabled: boolean, params: any) => {
        setIsSearchEnabled(enabled);
        setSearchParams(params);
    }, []);

    const handleSearch = () => {
        if (isSearchEnabled) {
            localStorage.setItem('searchParams', JSON.stringify(searchParams));
            navigate('/search');
        }
    };

    return (
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center'}}
             data-testid="home-page">
            <h1>GitHub Repository Search</h1>

            <Collapse items={items} style={{textAlign:"start"}}/>

            <div className='search-container'>
                <SearchBar onSearchEnabled={handleSearchEnabled}/>
                <SortOptions/>
                {isSearchEnabled && (
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button onClick={handleSearch}>
                            Поиск
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;

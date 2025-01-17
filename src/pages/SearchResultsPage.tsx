import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'antd';
import { RootState, AppDispatch } from '../store';
import { fetchRepos, setQuery, setLanguage, setLicense, setCreated, resetRepos, removeRepo } from '../store/repoSlice';
import RepoCard from '../components/RepoCard';
import Modal from '../components/Modal';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader.tsx";
import Button from "../components/Button.tsx";
import RepoInfo from "../components/RepoInfo.tsx";
import RepoInfoEdit from "../components/RepoInfoEdit.tsx";
import ShowMoreButton from "../components/ShowMoreButton.tsx";

const SearchResultsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { repos, isLoading, error} = useSelector((state: RootState) => state.repos);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<null | typeof repos[0]>(null);

    const [isEditing, setIsEditing] = useState(false);

    const storedParams = localStorage.getItem('searchParams');
    if (!storedParams) {
        navigate('/');
        return null;
    }

    const params = JSON.parse(storedParams);
    const { query: storedQuery, language, license, created } = params;

    const readableQuery = [
        storedQuery && `${storedQuery}`,
        language && `яп: ${language}`,
        license && `лицензия: ${license}`,
        created && `созданы после ${created}`,
    ]
        .filter(Boolean)
        .join(', ');

    useEffect(() => {
        if (storedParams) {
            const { query: storedQuery, language, license, created } = JSON.parse(storedParams);

            if (storedQuery) {
                dispatch(setQuery(storedQuery));
            }
            if (language) {
                dispatch(setLanguage(language));
            }
            if (license) {
                dispatch(setLicense(license));
            }
            if (created) {
                dispatch(setCreated(created));
            }

            dispatch(resetRepos());
            dispatch(fetchRepos());
        } else {
            navigate('/');
        }
    }, [dispatch, navigate, storedParams]);

    const openModal = (repo: typeof repos[0]) => {
        setSelectedRepo(repo);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRepo(null);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        if (selectedRepo) {
            dispatch(removeRepo(selectedRepo));
            alert("Удаление произошло успешно!");
            closeModal();
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={() => navigate('/')}>Главная</Button>
                <h2>Результаты поиска</h2>
            </div>

            {isLoading && repos.length === 0 ? (
                <Loader />
            ) : error ? (
                <div style={{ color: 'red' }}>Ошибка: {error}</div>
            ) : (
                <div>
                    <p>Репозитории, найденные по запросу {readableQuery}.</p>

                    {repos.length === 0 ? (
                        <div>
                            <p>Репозитории не найдены. Попробуйте изменить запрос.</p>
                            <p>
                                <Link to="/">Вернуться на главную страницу</Link>.
                            </p>
                        </div>
                    ) : (
                        <List
                            dataSource={repos}
                            loadMore={
                                <ShowMoreButton/>
                            }
                            renderItem={(repo) => (
                                <List.Item key={repo.id}>
                                    <RepoCard repo={repo} onDetails={() => openModal(repo)} />
                                </List.Item>
                            )}
                        />
                    )}

                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedRepo && (
                    <div>
                        {!isEditing ? (
                            // Режим просмотра
                            <RepoInfo
                                repo={selectedRepo}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ) : (
                            // Режим редактирования
                            <RepoInfoEdit repo={selectedRepo}
                                          onClose={closeModal}
                                          setIsEditing={setIsEditing}
                            />
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SearchResultsPage;

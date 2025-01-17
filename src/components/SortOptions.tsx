import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Typography } from 'antd';
import { setSortBy, setOrder, resetRepos, fetchRepos } from '../store/repoSlice';
import { AppDispatch, RootState } from '../store';

const { Option } = Select;
const { Title } = Typography;

const SortOptions: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const sortBy = useSelector((state: RootState) => state.repos.sortBy);
    const order = useSelector((state: RootState) => state.repos.order);

    const handleSortChange = (value: string) => {
        dispatch(setSortBy(value));
        dispatch(resetRepos());
        dispatch(fetchRepos());
    };

    const handleOrderChange = (value: string) => {
        dispatch(setOrder(value));
        dispatch(resetRepos());
        dispatch(fetchRepos());
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Title level={4}>Выберите параметры для сортировки результатов</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Select
                    defaultValue={sortBy}
                    onChange={handleSortChange}
                    style={{ width: '48%' }}
                >
                    <Option value="stars">Stars</Option>
                    <Option value="forks">Forks</Option>
                    <Option value="updated">Recently Updated</Option>
                </Select>
                <Select
                    defaultValue={order}
                    onChange={handleOrderChange}
                    style={{ width: '48%' }}
                >
                    <Option value="desc">По убыванию</Option>
                    <Option value="asc">По возрастанию</Option>
                </Select>
            </div>
        </div>
    );
};

export default SortOptions;
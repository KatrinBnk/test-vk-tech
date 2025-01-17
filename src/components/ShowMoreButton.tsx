import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchRepos } from '../store/repoSlice';
import { RootState, AppDispatch } from '../store';
import Loader from "./Loader.tsx";
import Button from "./Button.tsx";

const ShowMoreButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { page, isLoading, hasMore } = useSelector((state: RootState) => state.repos);

    const handleShowMore = () => {
        if (hasMore && !isLoading) {
            dispatch(setPage(page + 1));
            dispatch(fetchRepos());
        }
    };

    return (
        <div>
            {hasMore ? (
                isLoading ? (
                    <Loader/>
                ) : (
                    <Button
                        onClick={handleShowMore}
                    >
                        Показать больше
                    </Button>
                )
            ) : (
                <div>Больше репозиториев нет.</div>
            )}
        </div>
    );
};

export default ShowMoreButton;

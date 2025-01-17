import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Repo } from '../types/RepoType';

interface StarsFilter {
    min: number;
    max: number;
}

interface ForksFilter {
    min: number;
    max: number;
}

interface RepoState {
    repos: Repo[];
    isLoading: boolean;
    error: string;
    query: string;
    sortBy: string;
    order: string;
    page: number;
    language: string;
    license: string;
    stars: StarsFilter;
    forks: ForksFilter;
    created: string;
    hasMore: boolean;
    totalCount: number;
}

const initialState: RepoState = {
    repos: [],
    isLoading: false,
    error: '',
    query: '',
    sortBy: 'stars',
    order: 'desc',
    page: 1,
    language: '',
    license: '',
    stars: { min: 0, max: 100000 },
    forks: { min: 0, max: 100000 },
    created: '',
    hasMore: true,
    totalCount: 0,
};

export const fetchRepos = createAsyncThunk<
    { items: Repo[]; totalCount: number },
    void,
    { state: { repos: RepoState }; rejectValue: string }
>(
    'repos/fetchRepos',
    async (_, { getState, rejectWithValue }) => {
        const state = getState().repos;
        const { query, sortBy, order, page, language, license, created } = state;


        try {
            let filters = '';
            if (language) filters += ` language:${language}`;
            if (license) filters += ` license:${license}`;
            if (created) {
                filters += ` created:>=${created}`;
            }

            if (!filters && !query) {
                return rejectWithValue('Пустой запрос');
            }

            const response = await axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: `${query}${filters}`,
                    sort: sortBy,
                    order: order,
                    page: page,
                    per_page: 10,
                }
            });

            return { items: response.data.items as Repo[], totalCount: response.data.total_count };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при получении данных');
        }
    }
);


const repoSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
            state.page = 1;
            state.repos = [];
            state.hasMore = true;
            state.totalCount = 0;
        },
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload;
            state.page = 1;
            state.repos = [];
            state.hasMore = true;
            state.totalCount = 0;
        },
        setLicense(state, action: PayloadAction<string>) {
            state.license = action.payload;
            state.page = 1;
            state.repos = [];
            state.hasMore = true;
            state.totalCount = 0;
        },
        setCreated(state, action: PayloadAction<string>) {
            state.created = action.payload;
            state.page = 1;
            state.repos = [];
            state.hasMore = true;
            state.totalCount = 0;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
            state.page = 1;
            state.repos = [];
            state.hasMore = true;
            state.totalCount = 0;
        },
        setOrder(state, action: PayloadAction<string>) {
            state.order = action.payload;
            state.page = 1;
            state.repos = [];
            state.hasMore = true;
            state.totalCount = 0;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        resetRepos(state) {
            state.repos = [];
            state.page = 1;
            state.hasMore = true;
            state.totalCount = 0;
        },
        updateRepo(state, action: PayloadAction<Repo>) {
            const index = state.repos.findIndex(repo => repo.id === action.payload.id);
            if (index !== -1) {
                state.repos[index] = action.payload;
            }
        },
        removeRepo(state, action: PayloadAction<Repo>) {
            state.repos = state.repos.filter(repo => repo.id !== action.payload.id);
            state.totalCount = state.repos.length;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.isLoading = false;
                const newRepos = action.payload.items.filter(repo => !state.repos.some(r => r.id === repo.id));
                state.repos = [...state.repos, ...newRepos];
                state.totalCount = action.payload.totalCount;
                const maxAllowed = 1000; // GitHub API ограничивает до 1000 результатов
                const totalFetched = state.page * 10;
                state.hasMore = totalFetched < Math.min(action.payload.totalCount, maxAllowed);
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setQuery,
    setLanguage,
    setLicense,
    setCreated,
    setSortBy,
    setOrder,
    setPage,
    resetRepos,
    updateRepo,
    removeRepo
} = repoSlice.actions;

export default repoSlice.reducer;

import React, { useState, useEffect } from 'react';
import { Input, Select, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { setQuery} from '../store/repoSlice';
import { AppDispatch } from '../store';

const { Option } = Select;

interface SearchParams {
    query: string;
    language: string;
    license: string;
    created: string;
}

interface SearchBarProps {
    onSearchEnabled: (enabled: boolean,
                      params: SearchParams) => void;
}

const licenses = [
    { label: 'Все лицензии', value: '' },
    { label: 'MIT', value: 'mit' },
    { label: 'Apache 2.0', value: 'apache-2.0' },
    { label: 'GPLv3', value: 'gpl-3.0' },
];

const languages = [
    { label: 'Все языки', value: '' },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Python', value: 'Python' },
    { label: 'Java', value: 'Java' },
    { label: 'C++', value: 'C++' },
    { label: 'C#', value: 'C#' },
    { label: 'Ruby', value: 'Ruby' },
    { label: 'Go', value: 'Go' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Swift', value: 'Swift' },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearchEnabled }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [localQuery, setLocalQuery] = useState('');
    const [localLanguage, setLocalLanguage] = useState('');
    const [localLicense, setLocalLicense] = useState('');
    const [localCreated, setLocalCreated] = useState<string | null>(null);

    useEffect(() => {
        const isEnabled =
            localQuery.trim() !== '' ||
            localLanguage !== '' ||
            localLicense !== '' ||
            localCreated !== null;
        const params: SearchParams = {
            query: localQuery.trim(),
            language: localLanguage,
            license: localLicense,
            created: localCreated || '',
        };
        onSearchEnabled(isEnabled, params);
    }, [localQuery, localLanguage, localLicense, localCreated, onSearchEnabled]);

    const isFutureDate = (date: string) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate > today;
    };


    const handleDateChange = (dateString: string | null) => {
        if (dateString && isFutureDate(dateString)) {
            setLocalCreated(null);
            return;
        }
        setLocalCreated(dateString);
    };


    return (
        <div style={{ marginTop: '20px' }}>
            <Input
                placeholder="Поиск репозиториев..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onPressEnter={() => dispatch(setQuery(localQuery.trim()))}
                style={{ marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
                <Select
                    placeholder="Выберите язык"
                    value={localLanguage}
                    onChange={(value) => setLocalLanguage(value)}
                    style={{ flex: 1 }}
                >
                    {languages.map((lang) => (
                        <Option key={lang.value} value={lang.value}>
                            {lang.label}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Выберите лицензию"
                    value={localLicense}
                    onChange={(value) => setLocalLicense(value)}
                    style={{ flex: 1 }}
                >
                    {licenses.map((lic) => (
                        <Option key={lic.value} value={lic.value}>
                            {lic.label}
                        </Option>
                    ))}
                </Select>
                <DatePicker
                    onChange={(_, dateString) => handleDateChange(dateString as string | null)}
                    disabledDate={(currentDate) =>
                        currentDate && currentDate.toDate().getTime() > new Date().getTime()
                    }
                    placeholder="Создано после"
                    style={{ flex:1 }}
                />
            </div>
        </div>
    );
};

export default SearchBar;

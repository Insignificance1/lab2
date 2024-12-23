import React, { useState } from 'react';
import { TodoItemsContainer } from './TodoItemsContainer';
import { NewTodoItem } from '../TodoItem/NewTodoItem';
import { TodoItem } from '../TodoItem/TodoItem';
import { useData } from '../../data/hooks/useData';
import { SearchInput } from './components/SearchInput';
import { SortButton } from './components/SortButton'; // Импортируем нашу кнопку

export const TodoItems = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isSorted, setIsSorted] = useState(false); // Состояние для отслеживания сортировки

    const { data: todoItems, isLoading } = useData();

    if (!todoItems || isLoading) {
        return (
            <TodoItemsContainer>
                Загрузка данных...
            </TodoItemsContainer>
        );
    }

    const filteredBySearchItems = todoItems.filter((todoItem) => {
        const normalizedSearchValue = searchValue.trim().replace(/\s+/g, '').toLowerCase();
        const normalizedTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();

        return normalizedSearchValue.length >= 3
            ? normalizedTitle.includes(normalizedSearchValue)
            : true;
    });

    // Если сортировка включена, сортируем элементы по приоритету
    const sortedTodoItems = isSorted
        ? [...filteredBySearchItems].sort((a, b) => b.priority - a.priority)
        : filteredBySearchItems;

    const todoItemsElements = sortedTodoItems.map((item) => {
        return (
            <TodoItem
                key={item.id}
                id={item.id}
                title={item.title}
                checked={item.isDone}
                priority={item.priority}
            />
        );
    });

    // Функция для переключения сортировки
    const toggleSort = () => {
        setIsSorted(!isSorted);
    };

    return (
        <TodoItemsContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SearchInput value={searchValue} setValue={setSearchValue} />
                <SortButton
                    isSorted={isSorted}
                    onToggleSort={toggleSort}
                    sortOnUrl="/assets/images/png/Sort-on.png"  // URL для активной иконки сортировки
                    sortOffUrl="/assets/images/png/Sort-off.png" // URL для неактивной иконки сортировки
                />
            </div>
            {todoItemsElements}
            <NewTodoItem />
        </TodoItemsContainer>
    );
};

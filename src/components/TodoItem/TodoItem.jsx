import React from 'react';
import styled, { css } from "styled-components";
import { TodoItemContainer } from './TodoItemContainer';
import { TodoItemCheckbox } from './TodoItemCheckbox';
import { ItemPriority } from './ItemPriority';
import { useDeleteTodoItem, useToggleTodoItem, useUpdateTodoPriority } from '../../data/hooks/useData';


const checkedCss = css`
    color: #B5B5BA;
    text-decoration: line-through;
`;

const Title = styled.span(props => {
    return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
    white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
    flex-grow: 1;
  `;
})

const Delete = styled.span`
    display: inline-block;
    width: 13px;
    height: 13px;
    background-image: url(assets/images/png/delete.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 13px;
    flex-shrink: 0;
    cursor: pointer;
`;

export const TodoItem = ({ id, title, checked, priority }) => {
    const { mutate: deleteTodoItem } = useDeleteTodoItem();
    const { mutate: toggleTodoItem } = useToggleTodoItem();
    const { mutate: updatePriority } = useUpdateTodoPriority();

    const handleCheckboxClick = () => {
        toggleTodoItem({ id, isDone: !checked });
    };

    const handleDelete = () => {
        if (confirm(`Удалить задачу - "${title}"?`)) {
            deleteTodoItem(id);
        }
    };

    const handlePriorityChange = (newPriority) => {
        updatePriority({ id, priority: newPriority });
    };

    return (
        <TodoItemContainer>
            <TodoItemCheckbox checked={checked} onClick={handleCheckboxClick} />
            <Title checked={checked}>{title}</Title>
            <ItemPriority priority={priority} onChange={handlePriorityChange} />
            <Delete onClick={handleDelete} />
        </TodoItemContainer>
    );
};

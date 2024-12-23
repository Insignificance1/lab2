import React from 'react';
import styled from 'styled-components';

const PriorityIndicator = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: ${(props) =>
            props.priority === 1
                    ? 'green'
                    : props.priority === 2
                            ? 'orange'
                            : 'red'};
    cursor: pointer;
    border: ${(props) => (props.isSelected ? '2px solid #000' : 'none')};
    margin-right: 8px;
            &:hover {
                opacity: 0.5;
            }
`
;


export const ItemPriority = ({ priority, onChange }) => {
    const handleClick = () => {
        const newPriority = priority === 3 ? 1 : priority + 1; // Циклическое переключение 1 → 2 → 3 → 1
        onChange(newPriority);
    };

    return <PriorityIndicator priority={priority} onClick={handleClick} />;
};

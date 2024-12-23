import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 80px;
`;

export const SortButton = ({ isSorted, onToggleSort, sortOnUrl, sortOffUrl }) => {
    return (
        <Button onClick={onToggleSort}>
            <img
                src={isSorted ? sortOnUrl : sortOffUrl}
                alt="Sort"
                style={{ width: '24px', height: '24px' }}
            />
        </Button>
    );
};

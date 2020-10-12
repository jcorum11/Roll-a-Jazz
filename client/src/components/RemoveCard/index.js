import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { REMOVE_CARD } from '../../utils/mutations'
import ResultsModal from '../SearchResultsModal';

const RemoveCard = ({ card }) => {

    const [removeCard, { error }] = useMutation(REMOVE_CARD)

    const handleRemoveCard = async event => {
        event.preventDefault();
        
        try {
            // remove card from database
            await removeCard({
            variables: { ...card }
            });
        
            } catch (e) {
                console.error(e);
            }
        };

    return (
        <>
            <Button onClick={handleRemoveCard} value={card} variant="danger" style={{color:"white"}}>Remove From Collection</Button>
        </>
  )
}

export default RemoveCard;
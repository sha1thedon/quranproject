import React from 'react'

const RouteButton = ({buttonText, pageClickHandler}) => {
    return(
        <div>
            <button type='button' className='sendButton' onClick={pageClickHandler}>{buttonText}</button>
        </div>
    )
}

export default RouteButton

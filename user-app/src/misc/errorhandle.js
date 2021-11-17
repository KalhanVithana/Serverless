import React from 'react'

export default function Errorhandle(props) {
    return (
        <div className="error-notice" style={{color:"red"}}>
            <span>{props.message}</span>
        </div>
    )
}

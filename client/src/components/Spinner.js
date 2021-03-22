import React, { Fragment } from 'react'
import spinner from '../images/spinner.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} style={{ width: '100px', margin: '5rem auto auto', display: 'block' }} alt='Loading...' />
        </Fragment>
    )
}

export default Spinner

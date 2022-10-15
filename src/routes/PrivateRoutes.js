import { useHistory, Redirect } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
const PrivateRoutes = (props) => {
    let history = useHistory();
    const { user } = useContext(UserContext);
    // console.log('>>>', user);
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );
    } else {
        return <Redirect to={'/login'}></Redirect>
    }


}

export default PrivateRoutes;
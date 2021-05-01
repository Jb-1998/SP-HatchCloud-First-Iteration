import React, {useContext} from 'react';
import {Router} from '@reach/router';
import MainPage from '../container/MainPage/index'
import Presentation from '../container/Presentation/index'

const RouterScreen = () => {
    
    return (
        <Router>            
            <MainPage path="/"/>
            <Presentation path="/present"/>    
        </Router>
    )
}

export default RouterScreen;
// Main imports
import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import routes from './routes';

import { isUserInRoom, arePlayerReady } from './constants/Verification';
import './assets/css/App.css'

function App() {
    const { state, reducers, history } = useContext(store);
    const { user, roomsList, activeRoom } = state;

    useEffect(() => {
        reducers.handleUserAuth();
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {  
        isUserInRoom(roomsList, user)
            .then((room) => reducers.watchGameroom(room.RoomID))
            .catch(() => history.push('/'))
        // eslint-disable-next-line
    }, [roomsList])

    useEffect(() => {
        if (activeRoom && !activeRoom.Winner) {
            arePlayerReady(activeRoom)
                ? history.push('/gameroom')
                : history.push('/waitingroom');
        }
        // eslint-disable-next-line
    }, [activeRoom])

    return (
        <div className="App">
            <div className="container-fluid">
                <Switch>
                    {routes.map((route, i) =>
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            component={route.component} />
                    )}
                </Switch>
            </div>
        </div>
    );
}

export default App;

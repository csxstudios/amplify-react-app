import { React, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Home } from '../components';
import { parseDateISOString } from '../utils/dateFunctions';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export const AppContext = createContext(
    {
        signOut: null,
        user: null,
        session: null,
    }
);

const AppProvider = ({ signOut, user }) => {
    return (
        <AppContext.Provider value={{ signOut: signOut, user: user, session: parseDateISOString() }}>
            <Navbar />
            <Routes>
                <Route path="/*" element={<Home />} />
            </Routes>
        </AppContext.Provider>
    );
}

export default withAuthenticator(AppProvider);
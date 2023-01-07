import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './components';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = ({ signOut, user }) => {
  return (
    <Routes>
      <Route path="/*" element={<Home user={user} signOut={signOut} />} />
    </Routes>
  );
};

export default withAuthenticator(App);
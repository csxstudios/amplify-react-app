import { React } from 'react';
import AppProvider from './providers/AppProvider';

// import { withAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

const App = () => {
  return (
    <AppProvider>
    </AppProvider>
  );
};

export default App;
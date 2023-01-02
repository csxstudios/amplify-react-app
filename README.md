# Get Started on Windows 10/11

### Step 1: Enable WSL/VMP (open Powershell as admin):
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

### Step 2: Install WSL2 and Ubuntu:
- Install [WSL2](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
- Install "Ubuntu" from Microsoft Store

### Step 3: Launch Ubuntu
- Launch Ubuntu
- Configure user account

### Step 4: Update & Install Node
```sh
sudo apt upgrade
sudo apt install npm
sudo npm install -g n
sudo n stable
```

### Step 5: Restart Ubuntu
```sh
exit
```

### Step 6: Github Project Setup
- Create a new repo in github
- Open Ubuntu
- DO NOT mount windows volumes, i.e. `cd /mnt/c` (`npm start` only works in WSL2 home)
- Clone into your default home dir `git clone https://github.com/YOUR_USERNAME/my-app`

### Step 7: Create react app
Simply name the react app the same name as your repo:
```sh
npx create-react-app my-app
cd my-app
npm start
```

See official Microsoft instructions for [WSL2 installation](https://learn.microsoft.com/en-us/windows/wsl/install-manual).


# Get Started w/ AWS Amplify

### Install Amplify
```sh
sudo npm install -g @aws-amplify/cli
sudo npm install aws-amplify @aws-amplify/ui-react
```


### Common Amplify CLI Commands
```sh
amplify init
amplify add auth
amplify add api

amplify push

amplify add hosting
amplify publish

amplify delete
```

### Resources
[YouTube: AWS Amplify Full Stack Project](https://www.youtube.com/watch?v=T4MQrRDo20w)

[Github: .gitignore](https://github.com/facebook/react/blob/main/.gitignore)

[Github: react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction)

[ReactJS: Adding a SASS Stylesheet](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)

# Get Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Configure environment variable

- REACT_APP_APIKEY for mockapi (GET, PUT, POST, PATCH, DELETE)
- REACT_APP_FILESTACK_APIKEY for simulating s3 bucket

The project uses a simple tool provided by mockapi.io that lets you easily mock up APIs, generate custom data, and perform operations on it using RESTful interface. It is meant to be used as a prototyping/testing/learning tool. For further documentation please visit [https://github.com/mockapi-io/docs/wiki](https://github.com/mockapi-io/docs/wiki)

- Here, maximum number of fields(rows) is 100. Exceeding the limit causes error.

The project uses [https://www.filestack.com/](https://www.filestack.com/) which provides a set of tools and powerful APIs that allow you to upload, transform and deliver content easily. For further documentation please visit [https://www.filestack.com/docs/](https://www.filestack.com/docs/)

# Note: The project uses node v14.21.3

## Available Scripts

cd into the project directory, then run:

### `yarn`

Installs dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

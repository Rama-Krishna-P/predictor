### Step 1: Initialize PNPM Workspace

1. **Initialize a new PNPM workspace:**
    ```sh
    pnpm init
    ```

2. **Create a `pnpm-workspace.yaml` file:**
    ```yaml
    packages:
        - 'apps/*'
        - 'libs/*'
    ```

### Step 2: Nodejs project with typescript & webpack

1. **Create a nodejs project**
    ```powershell
    mkdir -p apps/test-app
    cd ./apps/test-app/
    pnpm init
    mkdir src
    # Create a new file index.ts in the src folder and  add console.log('hello world!')
    ```

2. **Add typescript support**
    ```powershell
    pnpm add typescript ts-node -D
    pnpm tsc --init
    ```

3. **Set up TypeScript configuration:**
    - Update `tsconfig.json`:
      ```json
      {
        "compilerOptions": {
          "outDir": "./dist",
          "module": "commonjs",
          "target": "es6",
          "strict": true,
          "esModuleInterop": true
        },
        "include": ["src/**/*.ts"],
        "exclude": ["node_modules"]
      }
      ```
    
    - Test by running:
      ```sh
      pnpm ts-node ./src/index.ts
      pnpm tsc
      cd ./dist
      node index.js
      ```

4. **Add nodemon**
    ```sh
    pnpm add nodemon -D
    pnpm nodemon ./src/index.ts
    ```

5. **Add start:dev script to package.json**
    ```json
    "start:dev": "pnpm nodemon ./src/index.ts"
    ```

6. **Test from workspace directory**
    ```powershell
    # Go to workspace directory
    pnpm --stream --r start:dev
    ```

7. **Add webpack**
    Refer https://www.youtube.com/playlist?list=PL4cUxeGkcC9hOkGbwzgYFmaxB0WiduYJC
    ```powershell
    cd apps/test-app
    pnpm add webpack webpack-cli ts-loader -D
    ```

8. **Create a webpack.config.js file**
    ```js
    const path = require('path')

    module.exports = {
        target: 'node',
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    include: [path.resolve(__dirname, 'src')]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
    ```    


### Step 3: Create TypeScript Library

1. **Create the library package:**
    ```sh
    mkdir -p libs/test-lib
    cd libs/test-lib
    pnpm init
    ```

2. **Install TypeScript and create `tsconfig.json`:**
    ```sh
    pnpm add -D typescript
    pnpm tsc --init
    ```

3. **Set up TypeScript configuration:**
    - Update `tsconfig.json` and make sure declaration property is set:
      ```json
      {
        "compilerOptions": {
          "outDir": "./dist",
          "module": "commonjs",
          "target": "es6",
          "strict": true,
          "esModuleInterop": true,
          "declaration":true
        },
        "include": ["src/**/*.ts"],
        "exclude": ["node_modules"]
      }
      ```
4. **Add a index.ts file in the src folder**
  ```typescript
    export const testFunction = () => {
      return 'from test module changed'
    }
  ```
5. **Add build script in the package.json**
    ```json
      "scripts": {
        ...
        "build": "pnpm tsc",
        ...
      },
    ```

    - Run the build command
    ```sh
    pnpm run build
    ```
    After building you should be able to see the index.ts and index.d.ts file in the dist folder
    <br/>
6. **Add the library reference in the test-app project**
    Run the following commands
    ```powershell
    cd ../../apps/test-app
    pnpm add ../../libs/test-lib
    ```
7.  **Use the library function and test**
    index.ts of test-app
    ```typescript
    ...
    import { testFunction } from "test-lib";
    ...
    console.log(`hello world ${testFunction()}`)
    ...
    ```
8.  **Build and test the application**
    - Add the build script in the package.json
    ```json
    ...
    "scripts": {
      ...
      "build": "webpack"
      ...
    },
    ```
    - Build the application using the command
    ```powershell
    pnpm run build
    ```
    - Run the application using the command
    ```powershell
    node ./dist/bundle.js
    ```
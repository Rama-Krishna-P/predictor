https://www.youtube.com/playlist?list=PL4cUxeGkcC9hOkGbwzgYFmaxB0WiduYJC - webpack

Sure, let's break down the steps to create a PNPM workspace with an Express TypeScript application and a TypeScript library. We'll also set up Webpack for bundling and create a Dockerfile to build the image of the node application.

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

3. **Create a nodejs project**
    ```powershell
    mkdir -p apps/test-app
    cd ./apps/test-app/
    pnpm init
    mkdir src
    # Create a new file index.ts in the src folder and  add console.log('hello world!')
    ```

4. **Add typescript support**
    ```powershell
    pnpm add typescript ts-node -D
    pnpm tsc --init
    ```

5. **Set up TypeScript configuration:**
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

6. **Add nodemon**
    ```sh
    pnpm add nodemon -D
    pnpm nodemon ./src/index.ts
    ```

7. **Add start:dev script to package.json**
    ```json
    "start:dev": "pnpm nodemon ./src/index.ts"
    ```

8. **Test from workspace directory**
    ```powershell
    # Go to workspace directory
    pnpm --stream --r start:dev
    ```

9. **Add webpack**
    Refer https://www.youtube.com/playlist?list=PL4cUxeGkcC9hOkGbwzgYFmaxB0WiduYJC
    ```powershell
    cd apps/test-app
    pnpm add webpack webpack-cli ts-loader -D
    ```

10. **Create a webpack.config.js file**
    ```js
    const path = require('path')

    module.exports = {
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


### Step 2: Create TypeScript Library

1. **Create the library package:**
    ```sh
    mkdir -p packages/my-library
    cd packages/my-library
    pnpm init
    ```

2. **Install TypeScript and create `tsconfig.json`:**
    ```sh
    pnpm add -D typescript
    pnpm tsc --init
    ```

3. **Create a simple function in the library:**
    - Create `src/index.ts`:
      ```typescript
      export const greet = (name: string): string => {
        return `Hello, ${name}!`;
      };
      ```

4. **Add a `build` script in `package.json`:**
    ```json
    "scripts": {
      "build": "tsc"
    }
    ```

### Step 3: Create Node Application with Express and TypeScript

1. **Create the application package:**
    ```sh
    mkdir -p packages/node-app
    cd packages/node-app
    pnpm init
    ```

2. **Install dependencies:**
    ```sh
    pnpm add express
    pnpm add -D typescript @types/node @types/express ts-loader webpack webpack-cli
    ```

3. **Set up TypeScript configuration:**
    - Create `tsconfig.json`:
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

4. **Set up Webpack configuration:**
    - Create `webpack.config.js`:
      ```javascript
      const path = require('path');

      module.exports = {
        entry: './src/index.ts',
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
          ],
        },
        resolve: {
          extensions: ['.ts', '.js'],
        },
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist'),
        },
        target: 'node'
      };
      ```

5. **Create the application entry point:**
    - Create `src/index.ts`:
      ```typescript
      import express from 'express';
      import { greet } from 'my-library';

      const app = express();
      const port = 3000;

      app.get('/', (req, res) => {
        res.send(greet('World'));
      });

      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
      ```

### Step 4: Link the Library in the Node Application

1. **Add the library as a dependency in the node application:**
    ```sh
    cd packages/node-app
    pnpm add ../my-library
    ```

2. **Update import path in `src/index.ts`:**
    ```typescript
    import { greet } from 'my-library';
    ```

### Step 5: Dockerize the Node Application

1. **Create a `Dockerfile` in the node application directory:**
    ```Dockerfile
    # Use official Node.js image as the base image
    FROM node:14

    # Create and change to the app directory
    WORKDIR /usr/src/app

    # Install PNPM
    RUN npm install -g pnpm

    # Copy the PNPM workspace
    COPY . .

    # Install dependencies
    RUN pnpm install --filter ./packages/node-app...

    # Build the application
    RUN pnpm --filter ./packages/node-app run build

    # Expose the port the app runs on
    EXPOSE 3000

    # Start the application
    CMD ["node", "./packages/node-app/dist/bundle.js"]
    ```

### Step 6: Build and Run the Docker Image

1. **Build the Docker image:**
    ```sh
    docker build -t my-node-app .
    ```

2. **Run the Docker container:**
    ```sh
    docker run -p 3000:3000 my-node-app
    ```

Now, your Express TypeScript application should be running inside a Docker container, utilizing the function from your TypeScript library and bundled with Webpack.


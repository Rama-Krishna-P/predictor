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

### Step 2: Create a host web app

1. **Create an angular project for host app**
    ```powershell
    pnpm ng new host-app --standalone=false --package-manager=pnpm --directory=apps/host-app
    ```

2. **Add webpack and webpack cli**
    ```powershell
    pnpm add webpack webpack-cli
    ```

3. **Add module federation to the project**
    ```powershell
    pnpm ng add @angular-architects/module-federation --port=4200
    ```
# My Own Organism Lineage Maker

## 1. App Concept

A web application that allows children to create their own original lineage trees of organisms, including ancient and extinct creatures, through an intuitive, drawing-like interface.

- **Target Audience:** Children interested in organisms, dinosaurs, and extinct life.
- **Objective:** To foster creativity and intellectual curiosity. To help users become familiar with the concept of evolution by creating their own phylogenetic trees.

## 2. Requirements

### Functional Requirements

1.  **Organism Registration:**
    -   The user inputs the name of an organism.
    -   (Future Implementation) The application will automatically fetch basic information such as the geological era, diet, etc., from web sources based on the input name.
    -   A new organism object is added to the canvas with the fetched information and a cute, system-generated illustration.
2.  **Lineage Tree Creation:**
    -   Users can freely arrange organisms on the canvas by dragging and dropping them.
    -   Users can connect multiple organisms with lines to represent relationships using a specific action (e.g., holding Shift while clicking).
3.  **Save/Export Feature:**
    -   The created lineage tree can be downloaded as an image file (e.g., PNG, JPEG).
    -   The work-in-progress can be saved in the browser (or on a server) to be resumed later.

### Non-Functional Requirements

-   **Design:** A colorful, cute, and friendly UI design that is enjoyable for children.
-   **Usability:** The application should be intuitive and easy to use without requiring specialized knowledge.

## 3. Implementation Plan & Tech Stack

-   **Frontend:** HTML, CSS, JavaScript
-   **Graphics Library:** Use [p5.js](https://p5js.org/) to create an interactive drawing experience.
-   **Development Steps:**
    1.  **Create Prototype (Completed):**
        -   Display fixed objects (circles) on the canvas.
        -   Implement drag-and-drop functionality for the objects.
        -   Implement line-drawing functionality between objects.
    2.  **Add UI Elements (Next Step):**
        -   Add a text input box for the organism's name and an "Add" button.
    3.  **Implement Dynamic Object Addition:**
        -   When the button is clicked, add a new organism object to the canvas with the specified name.
    4.  **Implement Information Fetching:** (Future)
        -   Integrate with an external API to automatically retrieve organism data.
    5.  **Implement Save Feature:** (Future)
        -   Implement functionality to save the tree as an image and to save the application state.
    6.  **Improve Design:** (Ongoing)
        -   Replace the basic circles and lines with illustration-based designs.

## 4. Deployment to Cloudflare Pages

This project can be deployed as a static site to Cloudflare Pages.

### Prerequisites

-   [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/)) installed.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/) installed and configured. You can install it globally or use `npx`.

### Deployment Steps

1.  **Install dependencies:**
    If you haven't already, install the `wrangler` CLI. If you are using the `package.json` provided, you can install it as a dev dependency:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Login to Cloudflare (if using Wrangler CLI directly for the first time):**
    ```bash
    npx wrangler login
    ```

3.  **Deploy the application:**
    You can deploy the application using the npm script defined in `package.json`:
    ```bash
    npm run deploy
    # or
    yarn deploy
    ```
    This command utilizes `wrangler pages deploy .` to deploy the contents of the current directory.

    Alternatively, you can run the Wrangler command directly:
    ```bash
    npx wrangler pages deploy .
    ```

### Configuration

-   **`wrangler.toml`**: This file contains the configuration for Wrangler, including the project name and compatibility date. The `pages_build_output_dir` is set to `"."` because all static assets (`index.html`, `style.css`, `app.js`) are in the root directory.
-   **`package.json`**: Includes a `deploy` script that simplifies the deployment process.
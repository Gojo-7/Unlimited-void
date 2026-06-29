import { App } from "./core/App.js";

const app = new App();

await app.initialize();

app.start();
const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());
app.use(routes);
if (process.env.PORT) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    // Use the __dirname variable along with the join function from path to share the dist folder in client through express.static()
    app.use(express.static(join(__dirname, '../client/dist')));
    // Create a catch-all route with a wildcard(*) to send the index.html file in client/dist
    app.get('*', (_, res) => {
        res.sendFile(join(__dirname, '../client/dist/index.html'));
    });
}
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

import setup from './setup';
import env from '../utils/env';
import database from '../utils/database';

database.connect();

setup.server.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
});
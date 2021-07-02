import setup from './setup';
import env from '../utils/env';


setup.server.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
});
import UsersTableSeeder from './users';
import { User } from '../../api/models/user';
import './../mongoose';

(() => {
    // Truncate tables
    User.remove({}, () => {});

    new UsersTableSeeder().run();
})();
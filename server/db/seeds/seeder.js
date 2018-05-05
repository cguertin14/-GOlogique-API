import './../mongoose';
import UsersTableSeeder from './users';
import ActivitiesTableSeeder from './activities';
import { User } from '../../api/models/user';
import { Activity } from '../../api/models/activity';

(async () => {
    // Truncate tables
    User.remove({}, () => {});
    Activity.remove({}, () => {});

    // Run seeders
    await new UsersTableSeeder().run();
    await new ActivitiesTableSeeder().run();
})();
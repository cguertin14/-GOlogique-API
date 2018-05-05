import './../mongoose';
import UsersTableSeeder from './users';
import PointsTableSeeder from './points';
import { User } from '../../api/models/user';
import { Point } from '../../api/models/point';

(async () => {
    // Truncate tables
    User.remove({}, () => {});
    Point.remove({}, () => {});

    await new UsersTableSeeder().run();
    await new PointsTableSeeder().run();

    //process.exit();
})();
import './../mongoose';
import UsersTableSeeder from './users';
import PointsTableSeeder from './points';
import { User } from '../../api/models/user';
import { Point } from '../../api/models/point';

(() => {
    // Truncate tables
    User.remove({}, () => {});
    Point.remove({}, () => {});

    new UsersTableSeeder().run();
    new PointsTableSeeder().run();
})();
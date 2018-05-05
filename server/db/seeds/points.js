import Seeder from './seed';
import { User } from '../../api/models/user';
import { Point } from '../../api/models/point';
import faker from 'faker/locale/fr_CA';

export default class PointsTableSeeder extends Seeder {
    async run() {
        // Get all users in database
        User.find({}, (err, users) => {
            if (err) throw err;

            // For each user
            users.forEach(async user => {
                await this.create(new Point({
                    value: faker.random.number,
                    userId: user._id
                }));
            });

            console.log('Points created!');
        });
    }
}
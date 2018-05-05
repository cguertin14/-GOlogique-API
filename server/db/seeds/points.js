import Seeder from './seed';
import { User } from '../../api/models/user';
import { Point } from '../../api/models/point';
import faker from 'faker/locale/fr_CA';
import asyncForEach from './../../utils/asyncForEach';

export default class PointsTableSeeder extends Seeder {
    async run() {
        // Get all users in database
        User.find({}, async (err, users) => {
            if (err) throw err;

            // For each user
            await asyncForEach(users, async user => {
                await this.create(new Point({
                    value: faker.random.number(999),
                    user: user._id
                }));
            });

            console.log('Points Seeder Done');
        });
    }
}
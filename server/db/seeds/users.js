import Seeder from './seed';
import { User } from '../../api/models/user';
import Faker from 'faker/locale/fr_CA';
import _ from 'lodash';

export default class UsersTableSeeder extends Seeder {
    async run() {
        _.range(0, 20).forEach(async (index) => {
            const firstName = Faker.name.firstName(1),
                  lastName  = Faker.name.lastName(1);
            let user = new User({
                email: Faker.internet.email(firstName, lastName, 'live.ca'),
                password: 'egologique',
                firstName,
                lastName
            });

            await this.create(user);
        });

        await this.create(new User({
            email: 'test@letsgo.com',
            password: 'egologique',
            firstName: 'Martin',
            lastName: 'Deschamps'
        }));

        console.log('Users created!');
    }
}
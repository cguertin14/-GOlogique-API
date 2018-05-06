import Seeder from './seed';
import { Activity } from '../../api/models/activity';
import faker from 'faker/locale/fr_CA';
import asyncForEach from './../../utils/asyncForEach';
import _ from 'lodash';

export default class ActivitiesTableSeeder extends Seeder {
    async run() {
        await asyncForEach(_.range(0,20), async index => {
            await this.create(new Activity({
                name: faker.name.title(),
                description: faker.random.words(40),
                points: faker.random.number(10, 1000),
                address: faker.address.streetAddress(true)
            }));
        });
        console.log('Activities Seeder Done');
    }
}
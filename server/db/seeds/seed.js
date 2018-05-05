export default class Seeder {
    async run() {}
    async create(instance) {
        try {
            await instance.save();
        } catch (e) {
            console.error(e);            
        }
    }
}
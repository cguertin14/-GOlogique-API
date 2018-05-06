import { User } from './../models/user';
import _ from 'lodash';
import BaseController from './baseController';
import numeral from 'numeral';
import { ObjectId } from 'mongodb';

export default class UserController extends BaseController {
    async signUp() {
        try {
            let body = _.pick(this.req.body, ['email', 'password', 'firstName', 'lastName']);
            let user = new User(body);
            await user.save();
            // Create new token
            let token = await user.generateAuthToken();
            return this.res.status(201).json({ user, token });
        } catch (e) {
            return this.res.status(406).send(e);
        }
    }

    async logIn() {
        try {
            let body = _.pick(this.req.body, ['email', 'password']);
            let user = await User.findByCredentials(body.email, body.password);
            // Create new token
            let token = await user.generateAuthToken();
            await this.updateFirstConnection(user);
            return this.res.json({ user, token });
        } catch (e) {
            return this.res.status(401).send({
                status: 'Wrong credentials.'
            });
        }
    }

    me() {
        return this.res.send({ user: this.req.user });
    }

    async logOut() {
        try {
            await this.req.user.removeToken(this.req.token);
            await this, this.updateFirstConnection(this.user);
            return this.res.status(200).send({
                success: true,
                status: 'Logged out'
            });
        } catch (e) {
            return this.res.status(400).send({ success: false });
        }
    }

    async updateFirstConnection(user) {
        return User.findOneAndUpdate({ _id: user._id }, {
            $set: {
                firstConnection: user.tokens.length === 0
            }
        }, { new: true }, (err, res) => {
            if (err) throw new Error('Could not edit user');
            return res;
        });
    }

    async leaderBoard() {
        try {
            const Users = User.find({}).sort({ points: -1 });
            const toCheck = await Users;
            Users.select(['firstName', 'lastName', 'points', '-_id']).limit(10).exec((err, users) => {
                if (err) throw err;
                return this.res.json({
                    users: users.map((user, index) => {
                        return { ...user.toJSON(), position: numeral(index + 1).format('0o') };
                    }),
                    currentUser: {
                        ..._.pick(this.user.toJSON(), ['firstName','lastName','points']),
                        position: numeral(toCheck.indexOf(toCheck.find(user2 => user2._id.toString() === this.user._id.toString()))).format('0o')
                    }
                });
            });
        } catch (error) {
            return this.res.status(500).json({ error });
        }
    }
}
import { UserSchemaModel } from './user.schema';
import { IMongoUserModel } from "./user.model";
import { RepositoryBase } from "../common/base.repository";
import * as Promise from 'bluebird';

const bcrypt = require('bcrypt');

export class UserRepository extends RepositoryBase<IMongoUserModel> {
    constructor() {
        super(UserSchemaModel);
    }

    verifyUserCredentials(username: string, password: string): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            this._model.findOne({ "name": username }, function (err, user: IMongoUserModel) {
                if (user && user.account) {
                    bcrypt.compare(password, user.account.password, function (err, success: boolean) {
                        if (!err && success) {
                            resolve(user);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject();
                }
            });
        });

        return promise;
    }
}
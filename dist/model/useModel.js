"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["READER"] = 0] = "READER";
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["ADMIN"] = 2] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
class User {
    constructor(
    // public _id: IdType,
    firstName, lastName, email, password, imageUrl, roles = [Role.READER, Role.AUTHOR]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageUrl = imageUrl;
        this.roles = roles;
    }
}
exports.User = User;
User.typeId = "User";

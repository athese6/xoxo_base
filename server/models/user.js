const uuid = require("uuid");
const {_User} = require("./constants");
const config = require("../../config/config.js");
const thinky = require("../lib/thinky");
const type = thinky.type;
const r = thinky.r;

const User = thinky.createModel("User", {
    id: type.string().default(function () {
        return _User.Prefix + uuid.v1().toLowerCase();
    }),
    modifiedAt: type.date().default(function () {
        return new Date();
    }),
    createdAt: type.date().default(function () {
        return new Date();
    }),
    phone: type.string(),
    phoneRegistered: type.boolean().default(false),
    phoneKey: type.virtual(),
    email: type.string().email().max(35),
    emailRegistered: type.boolean().default(false),
    emailKey: type.virtual(),
    name: type.string().min(2).max(30),
    gender: type.string().enum(Object.keys(_User.Gender)).default(_User.Gender.male),
    facebookLink: type.string().default(""),
    instagramLink: type.string().default(""),
    lang: type.string().default("ko"),
    role: type.string().enum(Object.keys(_User.Role)).default(function () {
        if (config.admins.includes(this.email)) {
            return _User.Role.admin;
        }
        return _User.Role.guest;
    }),
    photo: type.string().default(""),
    deletedAt: type.date(),
    start: type.date(),
    end: type.date(),
    memo: type.string(),
    isExist: type.virtual(),
    isOnline: type.virtual()
});

User.defineStatic("getView", function () {
    return this.without("password");
});

User.define("getView", function () {
    let user = Object.assign({}, this);
    delete user.password;
    return user;
});

User.table = function () {
    return r.table(this.getTableName());
};

module.exports = User;

const Branch = require("./branch");
User.hasOne(Branch, "branch", "branchId", "id");

const Company = require("./company");
User.hasOne(Company, "company", "companyId", "id");

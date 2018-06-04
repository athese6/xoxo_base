const uuid = require("uuid");
const {_Company} = require("./constants");
const thinky = require("../lib/thinky");
const type = thinky.type;
const r = thinky.r;

const Company = thinky.createModel("Company", {
    id: type.string().default(function () {
        return _Company.Prefix + uuid.v1().toLowerCase();
    }),
    modifiedAt: type.date().default(function () {
        return new Date();
    }),
    createdAt: type.date().default(function () {
        return new Date();
    }),
    legalName: type.string(),
    name: type.string(),
    logo: type.string(),
    buyCreditAt: type.date(),
    totalCredit: type.number().default(10.5),
    currentCredit: type.number().default(5.5),
    monthlyServiceCredit: type.number().default(3),
    otherLocationCreditRatio: type.number().default(0.3),
    used_credit: type.number().default(0),
    usedCreditOtherLocation: type.number().default(0),
    type: type.string().enum(Object.keys(_Company.Type)).default(_Company.Type.meeting),
    contactPointName: type.string(),
    contactPointPosition: type.string(),
    contactPointPhone: type.string(),
    contactPointEmail: type.string().email().max(35),
    size: type.number(),
    memo: type.string(),
});

Company.table = function () {
    return r.table(this.getTableName());
};

module.exports = Company;

const Branch = require("./branch");
Company.hasOne(Branch, "branch", "branchId", "id");

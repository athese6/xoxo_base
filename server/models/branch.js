const uuid = require("uuid");
const {_Branch} = require("./constants");
const thinky = require("../lib/thinky");
const type = thinky.type;
const r = thinky.r;

const Branch = thinky.createModel("Branch", {
    id: type.string().default(function () {
        return _Branch.Prefix + uuid.v1().toLowerCase();
    }),
    modifiedAt: type.date().default(function () {
        return new Date();
    }),
    createdAt: type.date().default(function () {
        return new Date();
    }),
    key: type.string(),
    name: type.string(),
    peektimeStart: type.date(),
    peektimeEnd: type.date(),
    freetimeStart: type.date(),
    freetimeEnd: type.date(),
});

Branch.table = function () {
    return r.table(this.getTableName());
};

module.exports = Branch;

const Company = require("./company");
Branch.hasMany(Company, "companies", "id", "companyId");

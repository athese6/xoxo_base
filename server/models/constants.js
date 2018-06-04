const KB = 1024;
const MB = 1048576; //KB * 1024
const GB = 1073741824; //MB * 1024
module.exports = {
    DBActionStatus: {
        new: "new",
        delete: "delete",
        update: "update"
    },
    MailType: {
        welcome: 0,
        confirmation: 1,
        confirm_change_password: 2,
        forgot_your_password: 3,
        invited_team: 5,
    },
    Prefix: {
        Asset: "ast-",
    },
    _Browser: {
        Prefix: "brw-",
    },
    _User: {
        Prefix: "usr-",
        Role: {
            admin: "admin",
            manager: "manager",
            member: "member",
            guest: "guest",
            bot: "bot"
        },
        Gender: {
            male: "male",
            female: "female"
        }
    },
    _Company: {
        Prefix: "cmpn-",
        Type: {
            all: "all",
            meeting: "meeting"
        }
    },
    _Branch: {
        Prefix: "brnc-",
    }
};

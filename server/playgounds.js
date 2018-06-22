// const AWS = require('aws-sdk');
// const uuid = require('uuid');
//
// const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'IDENTITY_POOL_ID'});
// const myConfig = new AWS.Config({
//     credentials: myCredentials, region: 'ap-northeast-2'
// });
//
// const s3 = new AWS.S3();
//
// const bucketName = 'node-sdk-sample-' + uuid.v4();
// const keyName = 'hello_world.txt';
//
//
// s3.createBucket({Bucket: bucketName}, function () {
//     var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//     s3.putObject(params, function (err, data) {
//         if (err)
//             console.log(err)
//         else
//             console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//     });
// });

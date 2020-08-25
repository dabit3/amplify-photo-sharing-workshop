// variable injection
var awsRegion = document.getElementById('awsRegion').title;
var kinesisStreamName = document.getElementById('kinesisStreamName').title;
var cognitoPoolId = document.getElementById('cognitoPoolId').title;
var deliveryId = document.getElementById('contentId').title;
var version = document.getElementById('versions').title;
var language = document.getElementById('language').title;
var scriptVersion = '2019-12-16'

// Send log to Kinesis
var sendLog = function () {
    console.log('Send Log')
    // Configure Credentials to use Cognito
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: cognitoPoolId
    });
    AWS.config.region = awsRegion;
    AWS.config.credentials.get(function (err) {
        if (err) {
            // alert('Error retrieving credentials.');
            console.error(err);
            return;
        }
        // create Amazon Kinesis service object
        var kinesis = new AWS.Kinesis({
            apiVersion: '2013-12-02'
        });

        // create user Id
        var userId
        // check whether user use HTML5
        if (window.localStorage) {
            // generate userId if not data in localstorage
            userId = localStorage.getItem('userId');
            isRegistered = 'false';
            if (userId == null) {
                userId = AWS.config.credentials.identityId;
                localStorage.setItem('userId', userId);
                isRegistered = 'true';
            }
        } else {
            userId = 'guestUser'
        }

        var recordData = [];
        var record = {
            Data: JSON.stringify({
                page_path: window.location.pathname,
                delivery_id: deliveryId,
                user_id: userId,
                is_regitered: isRegistered,
                version: version,
                language: language,
                scriptVersion: scriptVersion
            }),
            PartitionKey: 'partition-' + userId
        };
        recordData.push(record);

        kinesis.putRecords({
            Records: recordData,
            StreamName: kinesisStreamName
        }, function (err, data) {
            if (err) {
                console.error(err);
            }
        });

    });
};

// Call Send Log Func by every 10 sec when the Tab is focused 
var interval_sec = 10;
var is_focus = true;

window.onfocus = function () {
    console.log('Start focus')
    is_focus = true;
}
window.onblur = function () {
    console.log('End focus')
    is_focus = false;
}

var check_interval = setInterval(function () {
    console.log(is_focus)
    if (is_focus) {
        sendLog();
    }
}, interval_sec * 1000);
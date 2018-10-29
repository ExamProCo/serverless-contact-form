const validate    = require('validate.js')
const constraints = require('./constraints.js')
const AWS         = require('aws-sdk')
const sns         = new AWS.SNS()

function sms_success(data){
  console.log("Results from sending message: ", JSON.stringify(data, null, 2));
}
function sms_error(err){
  console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
}

async function success(data){
  console.log('success')
  let message = [
    `Full Name: ${data.full_name}`,
    `Organization: ${data.organization}`,
    `Email Address: ${data.email}`,
    `Phone Number: ${data.phone}`,
    `What best describes you?: ${data.customer_type}`,
    `What is your inquiry about?: ${data.inquiry}`,
    `How can we help you?: ${data.message}`
  ].join("\n")
  const params = {
    Subject: `[Contact Form] ${data.full_name} - ${data.inquiry}`,
    Message: message,
    TopicArn: process.env.TOPIC_ARN
  };
  console.log('params', params)
  await sns.publish(params, async function(err, d) {
    console.log('err', err)
    err ? sms_error(err) : sms_success(d)
  }).promise();
  return {
    statusCode: '200',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({success: true})
  }
}

function error(err){
  console.log('error',err)
  return {
    statusCode: '422',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(err)
  }
}

exports.handler = async (event) => {
  console.log('event.body',event.body)
  let results
  try {
    results = validate.async(JSON.parse(event.body), constraints).then(success,error)
  }
  catch (err) {
    console.log(err)
    return err
  }
  return results
};

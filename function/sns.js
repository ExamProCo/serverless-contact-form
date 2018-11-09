const AWS = require('aws-sdk')
const sns = new AWS.SNS()

function success(data){
  console.log(
    "[sns][success] Results from sending message: ",
    JSON.stringify(data, null, 2)
  )
}

function error(err){
  console.error(
    "[sns][error] Unable to send message. Error JSON:",
    JSON.stringify(err, null, 2)
  )
  throw new Error('sns error')
}

function params(data){
  return {
    Subject : `[Contact Form] ${data.full_name} - ${data.inquiry}`,
    Message : message(data),
    TopicArn: process.env.TOPIC_ARN
  }
}

function message(data){
  return [
    `Full Name: ${data.full_name}`,
    `Organization: ${data.organization}`,
    `Email Address: ${data.email}`,
    `Phone Number: ${data.phone}`,
    `What best describes you?: ${data.customer_type}`,
    `What is your inquiry about?: ${data.inquiry}`,
    `How can we help you?: ${data.message}`
  ].join("\n")
}

async function send_email(data){
  console.log('[sns][send_data]')
  await sns.publish(params(data), async function(err, d) {
    err ? error(err) : success(d)
  }).promise()
}

module.exports = send_email

const AWS      = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

function success(data){
  console.log(
    "[dynamodb][success] record inserted:",
    JSON.stringify(data, null, 2)
  )
}

function error(err){
  console.error(
    "[dynamodb][error] record failed to insert. Error JSON:",
    JSON.stringify(err, null, 2)
  )
}

function params(data){
  const item = {}
  if (data.full_name     !== '') {item.full_name     = { S: data.full_name    }}
  if (data.organization  !== '') {item.organization  = { S: data.organization }}
  if (data.email         !== '') {item.email         = { S: data.email        }}
  if (data.phone         !== '') {item.phone         = { S: data.phone        }}
  if (data.customer_type !== '') {item.customer_type = { S: data.customer_type}}
  if (data.inquiry       !== '') {item.inquiry       = { S: data.inquiry      }}
  if (data.message       !== '') {item.message       = { S: data.message      }}
  item.created_at = { S: new Date().toISOString() }
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: item,
    ReturnConsumedCapacity: "TOTAL"
  }
  console.log('[dynamodb][params]',params)
  return params
}

async function insert_record(data){
  console.log('[dynamodb][insert_record]')
  await dynamodb.putItem(params(data), async function(err, d) {
    err ? error(err) : success(d)
  }).promise()
}

module.exports = insert_record

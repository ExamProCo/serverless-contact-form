const validate      = require('validate.js')
const constraints   = require('./constraints.js')
const send_email    = require('./sns.js')
const insert_record = require('./dynamodb.js')

async function success(data){
  console.log('[api][success]',data)
  await insert_record(data)
  await send_email(data)
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
  console.error('[api][error]',err)
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
  const json = JSON.parse(event.body)
  try {
    results = validate.async(
      json,
      constraints
    ).then(success,error)
  }
  catch (err) {
    console.log(err)
    return err
  }
  console.log('results',results)
  return results
};

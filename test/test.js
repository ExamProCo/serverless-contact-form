/*
 * The purpose of this script is to make it easy to load
 * into the lambda docker container external json files 
 * for the purpose of testing.
 */
const { exec } = require('child_process')
const success  = require('./json/success.json')
const path     = require('path')

const event    = `'${JSON.stringify(success)}'`
const version  = 'lambci/lambda:nodejs8.10'
const pwd      = path.join(__dirname)
const dir_func = path.join(__dirname, '../function')
const command  = `docker run --rm --env-file ${pwd}/.env -v ${dir_func}:/var/task ${version} index.handler ${event}`

console.log(command)
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`${stderr}`)
  console.log(`${stdout}`)
});


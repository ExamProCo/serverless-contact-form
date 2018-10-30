const { exec }      = require('child_process')
const fs            = require('fs')
const path          = require('path')
const stack_name    = 'ServerlessContactFormXX'
const template_path = path.join(__dirname,'template.yaml')

fs.readFile('create-stack.config', 'utf8', function(err, contents) {
  const lines = contents.split("\n")
  lines.pop()
  let params = ''
  let val
  lines.forEach(function(line) {
    val = line.split('=')
    params += `ParameterKey=${val[0]},ParameterValue=${val[1]} `
  })

  const command = `aws cloudformation create-stack --stack-name ${stack_name} --template-body file://${template_path} --parameters ${params} --capabilities CAPABILITY_IAM`

  console.log(command)
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`${stderr}`)
    console.log(`${stdout}`)
  })
})

window.form_onsubmit = function(e,url){
  e.preventDefault()
  error_msgs_remove()
  disable_submit()
  setTimeout(animate_loader,125)
  setTimeout(submit_api(url),12000)
  return false
}

function formdata_to_json(){
  var object = {}
  var form = document.querySelector('form')
  var data = new FormData(form)
  data.forEach(function(value, key){
    object[key] = value;
  });
  return JSON.stringify(object)
}

function submit_api(url){
  xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      enable_submit()
      if (xhr.status === 200){
        success(JSON.parse(xhr.responseText))
      } else if (xhr.status === 422) {
        error(JSON.parse(xhr.responseText))
      }
    } // readyState
  } // onreadystatechange
  xhr.send(formdata_to_json())
}

function disable_submit(){
  var submit = document.querySelector("input[type='submit']")
  submit.setAttribute('disabled','disabled')
  submit.classList.add('active')
}

function enable_submit(){
  var submit = document.querySelector("input[type='submit']")
  submit.removeAttribute('disabled')
}

function animate_loader(){
  var submit = document.querySelector("input[type='submit']")
  submit.classList.add('loader')
}

function animate_success(){
  var submit = document.querySelector("input[type='submit']")
  submit.classList.remove('loader')
  submit.classList.remove('active')
  submit.value = 'Success'
  submit.classList.add('success')
  submit.classList.add('animated')
  submit.classList.add('pulse')
}

function animate_revert(){
  var submit = document.querySelector("input[type='submit']")
  submit.value = 'Submit'
  submit.classList.remove('success')
  submit.classList.remove('animated')
  submit.classList.remove('pulse')
  submit.blur()
}

function success(data){
  animate_success()
  setTimeout(animate_revert,2900)
}

function error(errors){
  animate_success()
  setTimeout(animate_revert,2900)

  let field
  for (var key in errors) {
    if (errors.hasOwnProperty(key)) {
      field = document.querySelector(`.field.${key}`)
      field.classList.add('err')
      error_msg(field,errors[key])
    }
  }

}

function error_msg(field,msgs){
  el = document.createElement('div')
  dom = ''
  msgs.forEach(function(msg) {
    dom += `<div class='err_message'>${msg}</div>`
  })
  dom += "<div class='clear'></div>"
  el.innerHTML = dom
  el.classList.add('err_messages')
  field.appendChild(el)
}

function error_msgs_remove(){
  var err_fields = document.querySelectorAll('.field.err')
  for(i = 0; i < err_fields.length; i++) {
    err_fields[i].classList.remove('err')
  }

  var err_msgs = document.querySelectorAll('.err_messages')
  var parent
  var child
  for(i = 0; i < err_msgs.length; i++) {
    child  = err_msgs[i]
    parent = child.parentNode
    parent.removeChild(child)
  }

}

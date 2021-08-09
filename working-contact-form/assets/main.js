const form = document.querySelector('form'),
  statusTxt = form.querySelector('.button-area span')

form.onsubmit = e => {
  // preventing form from submtting
  e.preventDefault()
  statusTxt.style.color = '#0d6efd'
  statusTxt.style.display = 'block'
  form.classList.add('disabled')

  // creating new xml object
  let xhr = new XMLHttpRequest()
  // sending post request to message.php file
  xhr.open('POST', 'message.php', true)
  xhr.onload = () => {
    // once ajax loaded

    // if ajax response status is 200 & ready status is 4 means there is no any error
    if (xhr.readyState === 4 && xhr.status === 200) {
      // storing ajax response in a response variable
      let response = xhr.response
      // if response is an error like enter valid email address then we'll change status color to red else reset the form
      if (
        response.indexOf('Email and message field is required!') != -1 ||
        response.indexOf('Enter a valid email address!') != -1 ||
        response.indexOf('Sorry, failed to send your message!') != -1
      ) {
        console.log(response)
        statusTxt.style.color = '#ff0000'
      } else {
        statusTxt.style.color = '#43de20'
        form.reset()
        // hide the statusTxt after 3 seconds if the msg is sent
        setTimeout(() => {
          statusTxt.style.display = 'none'
        }, 3000)
      }
      statusTxt.innerHTML = response
      form.classList.remove('disabled')
    }
  }
  // creating new FormData object. This object is used to send form data
  let formData = new FormData(form)
  //sending form data
  xhr.send(formData)
}

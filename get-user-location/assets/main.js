const button = document.querySelector('button')

button.addEventListener('click', () => {
  if (navigator.geolocation) {
    // if browser support geolocation api
    // geolacation.getCurrentPosition method is use to get current position of the device
    // it takes three parameter success, error, options. If everything is right then success
    // callback function will call else error callback function will call. We don't need third parameter for this project
    button.innerText = 'Allow to detect location'
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    button.innerText = 'Yor browser not support'
  }
})

const api_key = 'fcc2365c95354a74bf74e278a7541aeb'

function onSuccess(position) {
  button.innerText = 'Detecting your location...'
  let { latitude, longitude } = position.coords
  // sending get request to the api with passing latitude and longitude coordinates of the user position
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`
  )
    // parsing json date into javascript object and returning it and in another then function receiving the object that is sent by the api
    .then(response => response.json())
    .then(result => {
      // passing components obj to allDetails variables
      let allDetails = result.results[0].components
      // getting county, postcode, country properties value from allDetails obj
      let { road, postcode, city, state, country } = allDetails
      button.innerText = `${road} - ${postcode}, ${city}, ${state}, ${country}`
      console.table(allDetails)
    })
    .catch(() => {
      // if any error occurred
      button.innerText = 'Something went wrong'
    })
}

function onError(error) {
  if (error.code === 1) {
    // if user denied the request
    button.innerText = 'Yor denied the request'
  } else if (error.code === 2) {
    // if location is not available
    button.innerText = 'Location not available'
  } else {
    // if any error occurred
    button.innerText = 'Something went wrong'
  }
  // is user denied the request then button will be disabled
  button.setAttribute('disabled', 'true')
}

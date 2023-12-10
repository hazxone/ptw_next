var SUPABASE_URL = 'https://iyxpyugpyisblbhdtztx.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eHB5dWdweWlzYmxiaGR0enR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMjI4MzAsImV4cCI6MjAxMjU5ODgzMH0.5ZNBX2pUCxe-uHkjTLNcqwr_1hDFCIs7iHKpaT5S29o'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
window.userToken = null

document.addEventListener('DOMContentLoaded', function (event) {
  var signUpForm = document.querySelector('#sign-up')
  signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)

  var logInForm = document.querySelector('#log-in')
  logInForm.onsubmit = logInSubmitted.bind(logInForm)

  var userDetailsButton = document.querySelector('#user-button')
  userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton)

  var logoutButton = document.querySelector('#logout-button')
  logoutButton.onclick = logoutSubmitted.bind(logoutButton)
})

const signUpSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signUp({ email, password })
    .then((response) => {
      alert("response.error.message")
    })
    .catch((err) => {
      alert(err)
    })
}

const logInSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signInWithPassword({ email, password })
    .then((response) => {
      alert("response.error.message")
    })
    .catch((err) => {
      console.log(err)
    })
}

const fetchUserDetails = () => {
  alert(JSON.stringify(supabase.auth.user()))
}

const logoutSubmitted = (event) => {
  event.preventDefault()

  supabase.auth
    .signOut()
    .then((_response) => {
      document.querySelector('#access-token').value = ''
      document.querySelector('#refresh-token').value = ''
      alert('Logout successful')
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

// function setToken(response) {
//   // if (response.user.confirmation_sent_at && !response?.session?.access_token) {
//   //   alert('Confirmation Email Sent')
//   // } else {
//     document.querySelector('#access-token').value = response.session.access_token
//     document.querySelector('#refresh-token').value = response.session.refresh_token
//     alert('Logged in as ' + response.user.email)
//   // }
// }

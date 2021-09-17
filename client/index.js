document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

  const userContainer = document.querySelector('#user-info')
  const loginForm = document.querySelector('#login-form')
  const registerForm = document.querySelector('#register-form')
  
  const baseURL = `http://localhost:4000/api`
  
  const login = body => axios.post(`${baseURL}/login`, body).then( res => {
    createUserCard(res.data)
  }).catch(err => {
    console.log(err.response.data)
    alert('Uh oh. Your request did not work.')
  })
  const register = body => axios.post(`${baseURL}/register`, body).then(res => {
    createUserCard(res.data)
  }).catch(err => {
    console.log(err.response.data)
    alert('Uh oh. Your request did not work.')
  })
  
  function loginSubmitHandler(e) {
      e.preventDefault()
  
      let username = document.querySelector('#login-username')
      let password = document.querySelector('#login-password')
  
      let bodyObj = {
          username: username.value,
          password: password.value
      }
  
      login(bodyObj)
  
      username.value = ''
      password.value = ''
  }
  
  function registerSubmitHandler(e) {
    e.preventDefault()
  
    let username = document.querySelector('#register-username')
    let email = document.querySelector('#register-email')
    let firstName = document.querySelector('#register-firstName')
    let lastName = document.querySelector('#register-lastName')
    let password = document.querySelector('#register-password')
    let password2 = document.querySelector('#register-password-2')
  
    if (password.value !== password2.value) {
      alert("Your passwords need to match.")
      return
    }
  
    let bodyObj = {
        username: username.value,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value
    }
  
    register(bodyObj)
  
    username.value = ''
    email.value = ''
    firstName.value = ''
    lastName.value = ''
    password.value = ''
    password2.value = ''
  }
  
  function createUserCard(data) {
      userContainer.innerHTML = ''
      const userCard = document.createElement('div')
      userCard.innerHTML = `${data.message}`
      userContainer.appendChild(userCard)
  }
  
  loginForm.addEventListener('submit', loginSubmitHandler)
  registerForm.addEventListener('submit', registerSubmitHandler)
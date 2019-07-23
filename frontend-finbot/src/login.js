// this JS script covers all login-related functions
// It should be placed BELOW the application.js file, as it depends 
// on certain global variables declared at the top of application.js  

// brings up the user login page

// const main = document.querySelector('main')
function showLoginScreen() {
    main.innerHTML = ` 
    <form id="login-form">
        Username: 
        <input type="text" name="username"/><br>
        Password: 
        <input type="password" name="password"/><br>
        <input type="submit"/>
    </form><br>
    <button id="signup-button">Sign Up</button>
    `

    // submits username and password for logging in through a POST request to /users
    const loginForm = document.getElementById('login-form')
    const signupButton = document.getElementById('signup-button')

    loginForm.addEventListener('submit',function(e) {
        e.preventDefault()
        const username = e.target[0].value
        const password = e.target[1].value

        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(res => res.json())
        .then(data => {
            // if the login request is successful
            localStorage.setItem("user_id", data.id)
            showDashboard(data)
        })
    }) // ends the eventListener for 'submit'

    // adds an eventListener for the button to signup a user
    signupButton.addEventListener('click', function(e) {
        showSignupPage()
    })
}

// brings up a new user signup page
function showSignupPage() {
    main.innerHTML = `<h1>Signup a new user</h1> 
    <form id="signup-form">
        First name: 
        <input type="text" name="first_name"/><br>
        Last name: 
        <input type="text" name="last_name"/><br>
        Username: 
        <input type="text" name="username"/><br>
        Age: 
        <input type="number" name="age"/><br>
        Password: 
        <input type="password" name="password"/><br>
        Confirm password: 
        <input type="password" name="password_confirmation"/><br>
        <input type="submit"/>
    </form>`

// submits information for creating a new user account to /users
    const signupForm = document.getElementById('signup-form')
    signupForm.addEventListener('submit',function(e) {
        e.preventDefault()
        
        const first_name = e.target[0].value
        const last_name = e.target[1].value
        const username = e.target[2].value
        const age  = e.target[3].value
        const password = e.target[4].value
        const password_confirmation  = e.target[5].value

        fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "username": username,
                "age": age,
                "password": password,
                "password_confirmation": password_confirmation
            })
        })
        .then(res => res.json())
        .then(data => {
            // if the login request is successful
            localStorage.setItem("user_id", data.id)
            showDashboard(data)
        })
    }) // ends the eventListener for submitting new user data
} // ends showSignupPage


// brings up a form for creating a financial plan

// submits the financial plan form
    
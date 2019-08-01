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
        const body = {
            "username": username,
            "password": password
        }
        
        localAdapter.postLogin(body).then(data => {
            // if the login request is successful
            
            if(!(data.error == null)){
                showLoginScreen()
            }else{
                console.log(data)
                localStorage.setItem("user_id", data.id)
                localStorage.setItem("plan_id", data.plan.id)
                showDashboard()
            }
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
        Email: 
        <input type="text" name="email"/><br>
        Phone number: 
        <input type="text" name="telephone"/><br>
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
        const email = e.target[3].value
        const telephone = e.target[4].value
        const age  = e.target[5].value
        const password = e.target[6].value
        const password_confirmation  = e.target[7].value

        attributes = {
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "email": email,
            "telephone": telephone,
            "age": age,
            "password": password,
            "password_confirmation": password_confirmation
        }

        localAdapter.postUser(attributes)
        .then(data => {
            // if the login request is successful
            localStorage.setItem("user_id", data.id)
            showFinancialPlan()
        })
    }) // ends the eventListener for submitting new user data
} // ends showSignupPage



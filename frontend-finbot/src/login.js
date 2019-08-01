// this JS script covers all login-related functions
// It should be placed BELOW the application.js file, as it depends 
// on certain global variables declared at the top of application.js  

// brings up the user login page

// const main = document.querySelector('main')
function showLoginScreen() {
    main.innerHTML = ` 
    <div class="logimg">
    <div class="container">
        <form id="login-form">
        <body>
            <h2 class="text-center">Welcome!</h2>
            <div class="form-group">
                Username: <input type="text" class="form-control" placeholder="Username" required="required" name="username"/><br>
            </div>
            <div class="form-group">
                Password: <input type="password" class="form-control" placeholder="Password" required="required" name="password"/><br>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </div>
        </form><br>
        <p class="text-center"><button id="signup-button">Sign Up</button></p>
        </body>
    </div>
    </div>
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
    main.innerHTML = `
    <div class="container">
        <body>     
            <form id="signup-form" >
                <h2>Register</h2>
                <p class="hint-text">Create your account. It's free and only takes a minute.</p>
                <div class="form-group">
                    <div class="row">
                        <div class="col-xs-6"><input type="text" class="form-control" name="first_name" placeholder="First Name" required="required"></div>
                        <div class="col-xs-6"><input type="text" class="form-control" name="last_name" placeholder="Last Name" required="required"></div>
                    </div>    
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="username" placeholder="Username" required="required">
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="Email" required="required">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="telephone" placeholder="Phone Number" required="required">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" name="age" placeholder="Age" required="required">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password" required="required">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm Password" required="required">
                </div>        
                <div class="form-group">
                    <button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
                </div>
            </form>
            <div class="text-center">Already have an account? <a href="#">Sign in</a></div>
        </body> 
    </div>
    `

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



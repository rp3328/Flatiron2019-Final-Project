// this JS script covers all login-related functions
// It should be placed BELOW the application.js file, as it depends 
// on certain global variables declared at the top of application.js  

// brings up the user login page

{/* <div class = "alert alert-warning alert-dismissable">
<button type = "button" class = "close" data-dismiss = "alert" aria-hidden = "true">
&times;
</button>
We do not recognize that username/password combination. Please try again.
</div> */}

function alertError(element_below_error, errorText) {
    const alertHTML = `
    <div class = "alert alert-warning alert-dismissable fade show" role="alert">
        <button type = "button" class = "close" data-dismiss = "alert">
        &times;
        </button>
        <h6>${errorText}</h6>
    </div>
    `
    element_below_error.insertAdjacentHTML('beforebegin', alertHTML)
}
function showLoginScreen() {
    main.innerHTML = ` 


    <div class="logimg">
    <div class="body">
        <form id="login-form">
        <body>
            <div class="ctitle">
                <h2 class="text-center">Welcome!</h2>
            </div>
            <div class="form-group">
                Username: <input type="text" class="form-control" placeholder="Username" required="required" name="username"/>
            </div>
            <div class="form-group">
                Password: <input type="password" class="form-control" placeholder="Password" required="required" name="password"/>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </div>
        </form>
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
                const loginForm = document.getElementById('login-form')
                alertError(loginForm, data.error)
            }else{
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
    <div class="logimg">
    <div class="body">
        <body>     
            <form id="signup-form" >
                <div class="signup">
                    <h2 class="ctitle">Register</h2>
                <p class="hint-text">Create your account. We will make you rich.</p>
                
                <br>
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
                    <input type="tel" class="form-control" name="telephone" placeholder="Phone Number" required="required">
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
 
                <div class="text-center">Already have an account? <a id="back" href="#">Sign in</a></div>
      
            </div>
        </body> 
    </div>
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
            // if the signup request is successful
            if(!(data.error == null)){
                const signupForm = document.getElementById('signup-form')
                alertError(signupForm, data.error)
            }else{
            localStorage.setItem("user_id", data.id)
            showFinancialPlan()
            }
        })
    }) // ends the eventListener for submitting new user data

    //sends user back to login screen
    const backForm = document.getElementById(`back`)
    backForm.addEventListener('click', function(e){
        showLoginScreen()
    })

} // ends showSignupPage



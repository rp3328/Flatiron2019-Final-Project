const BASE_URL = "http://localhost:3000"
// const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function(){
    showLoginScreen()
    if(localStorage.getItem('user_id')) {
        // if the user ID is found, that means we've logged in
        const userId = localStorage.getItem('user_id')

        fetch(`${BASE_URL}/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            showDashboard(user)
        })

    } else {
        // go back to the login screen with an error message
        showLoginScreen()
    }

})
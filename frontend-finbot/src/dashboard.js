const main = document.querySelector('main')

function showDashboard(user) {
    main.innerHTML = `<h2>Great job logging in ${user.username}!</h2>
    <button id="logout-button">Logout</button>`

    //logout functionality
    const logoutButton = document.getElementById(`logout-button`)
    logoutButton.addEventListener('click', function(e){
      localStorage.removeItem('user_id')
      showLoginScreen()
    })
}
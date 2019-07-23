const main = document.querySelector('main')

function showDashboard(user) {
    main.innerHTML = `<h2>Great job logging in ${user.username}!</h2>
    <button id="logout-button">Logout</button>
    <div id=financial-plan> </div>
    <button id="edit-button">Edit Plan</button>`

    //logout functionality
    const logoutButton = document.getElementById(`logout-button`)
    logoutButton.addEventListener('click', function(e){
      localStorage.removeItem('user_id')
      showLoginScreen()
    })
    //financial plan view
    const plan = document.getElementById(`financial-plan`)
    plan.innerHTML += `
    Have some kind of plan graphic here...
    `
    
    //edit financial plan
    const edit = document.getElementById('edit-button')
    edit.innerHTML += ` have a function that renders an update form`
}
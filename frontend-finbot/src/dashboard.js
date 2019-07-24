function showDashboard() {
    main.innerHTML = `<h2>User Dashboard</h2>
    <canvas id="assets-chart" width="600 height="600></canvas>
    <button id="logout-button">Logout</button>
    <div id=financial-plan> </div>
    <button id="edit-button">Edit Plan</button>
    <button id="asset-button">Edit Assets</button>
    <button id="profile-button">View Profile</button>
    `

    // create the assets chart, showing past value and a projection for future value
    const chartContainer = document.getElementById("assets-chart")

    // create a fetch request to our API for the data on the user's assets
    // fetch(`${BASE_URL}/users/${localStorage.user_id}/getValue`)
    // .then(res => res.json())
    // .then(data => {
    //   debugger
    // })
    // const assetsChart = new Chart(chartContainer, {
    //   type: 'line',
    //   data: data
    // })

    //logout functionality
    const logoutButton = document.getElementById(`logout-button`)
    logoutButton.addEventListener('click', function(e){
      localStorage.removeItem('user_id')
      showLoginScreen()
    })
    //financial plan view
    const plan = document.getElementById(`financial-plan`)
    plan.innerHTML += `
    <canvas id="myChart"></canvas>
    `
    //edit financial plan
    const editButton = document.getElementById('edit-button')
    editButton.addEventListener('click', function(){
      editPlan()
    })
    //edit assets
    const assetButton = document.getElementById('asset-button')
    assetButton.addEventListener('click', function(e){
      editAssets()
    })

    //view user data
    const viewButton = document.getElementById('profile-button')
    viewButton.addEventListener('click', function(e){
      viewProfile()

    })
        

    
}
function createList(parent, arr){
  arr.forEach(function (e){
    var li = document.createElement('li'), ul;

    li.textContent = e.name;
    if (e.nest){
      ul = document.createElement('ul');
      li.appendChild(ul);
      createList(ul, e.nest);
    }
  })
}


function showDashboard() {
    main.innerHTML = 
    `<h2>User Dashboard</h2>
    <canvas id="assets-chart" width="600 height="600></canvas>
    <div id=financial-plan> </div>
    <div id="actions">

    </div>
    <button id="edit-button">Edit Plan</button>
    <button id="asset-button">Edit Assets</button>
    <button id="profile-button">View Profile</button>
    <button id="logout-button">Logout</button>
    `

    // create the assets chart, showing past value and a projection for future value
    const chartContainer = document.getElementById("assets-chart")

    // create a fetch request to our API for the data on the user's assets
    fetch(`${BASE_URL}/users/${localStorage.user_id}/getValue`)
    .then(res => res.json())
    .then(data => {
      const assetsChart = new Chart(chartContainer, {
        type: 'line',
        data: data,
        options: {
          scales: {
              yAxes: [{
                  stacked: true
              }]
          }
        }
      })
  
    })
    
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
    
    //locate actions div
    const actionDiv = document.getElementById('actions')
    actionDiv.innerHTML = ""
    fetch(`${BASE_URL}/users/${localStorage.user_id}`)
    .then(resp => resp.json())
    .then(data=> {
      console.log(data.assets[0])
      //calculate networth by asset and total
      allohash = calType(data.assets)
      totMon = calTotal(data.assets)
      comparePlan(allohash,totMon, data.plan)

      actionDiv.innerHTML += `<h4>Possible Actions:</h4>`
      //create list with id=actionList
      ul = document.createElement('ul')
      ul.setAttribute("id", "actionList")
      actionDiv.appendChild(ul)
      console.log(actionDiv)

      //add individual elements for ul
        let li = document.createElement('li')
        li.appendChild(document.createTextNode("Action 1"))
        li.setAttribute("id", "placeholder for action id")
        ul.appendChild(li);

    })
}

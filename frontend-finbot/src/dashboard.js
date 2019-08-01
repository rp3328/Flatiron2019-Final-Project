function showDashboard() {
    main.innerHTML = 
    `
    <h2 class ="white">User Dashboard</h2>
    <div id=financial-plan> </div>
    <div class="container">
        <canvas id="assets-chart" width="400" height="400"></canvas>
    </div>
    <div class="container">
        <canvas id="plan-chart" width="400" height="400"></canvas>
    </div>
    <div id="actions" class="test">

    </div>
    <button id="edit-button">Edit Plan</button>
    <button id="asset-button">Edit Assets</button>
    <button id="link-button">Link Account</button>
    <button id="profile-button">View Profile</button>
    <button id="logout-button">Logout</button>
    `

    let plaidOpenHandler = (function($) {
      var handler = Plaid.create({
        clientName: 'Plaid Quickstart',
        // Optional, specify an array of ISO-3166-1 alpha-2 country
        // codes to initialize Link; European countries will have GDPR
        // consent panel
        countryCodes: ['US'],
        env: 'sandbox',
        // Replace with your public_key from the Dashboard
        key: '7741da348ca62c9f4d4ff17664985d',
        product: ['investments'],
        // Optional, use webhooks to get transaction and error updates
        webhook: 'https://requestb.in',
        // Optional, specify a language to localize Link
        language: 'en',
        onLoad: function() {
          // Optional, called when Link loads
        },
        onSuccess: function(public_token, metadata) {
          // Send the public_token to your app server.
          // The metadata object contains info about the institution the
          // user selected and the account ID or IDs, if the
          // Select Account view is enabled.
          $.post('http://localhost:3000/get_access_token', {
            public_token: public_token,
            user_id: localStorage.user_id
          });
        },
        onExit: function(err, metadata) {
          // The user exited the Link flow.
          if (err != null) {
            // The user encountered a Plaid API error prior to exiting.
          }
          // metadata contains information about the institution
          // that the user selected and the most recent API request IDs.
          // Storing this information can be helpful for support.
        },
        onEvent: function(eventName, metadata) {
          // Optionally capture Link flow events, streamed through
          // this callback as your users connect an Item to Plaid.
          // For example:
          // eventName = "TRANSITION_VIEW"
          // metadata  = {
          //   link_session_id: "123-abc",
          //   mfa_type:        "questions",
          //   timestamp:       "2017-09-14T14:42:19.350Z",
          //   view_name:       "MFA",
          // }
        }
      });

      return function(e) {
        handler.open();
      };
    })(jQuery);


    // create a fetch request to our API to create the assets-chart
    const chartContainer = document.getElementById("assets-chart")
    
    localAdapter.getValue()
    .then(response => {
      let chartData = response["data"]
      let chartOptions = response["options"]
      
      // add coloring to each asset type
      chartData["labels"].forEach(function(label) {
        chartData["datasets"][0]["backgroundColor"].push(themeColor(label))
      })

      // add labelling guidelines to chart_options
      chartOptions.tooltips = {
        callbacks: {
            label: function(tooltipItem, data) {
                let label = data.labels[tooltipItem.index] || ""

                const totalAssets = data.datasets[0].data.reduce((a,b) => a+b, 0)
                const assetTypeValue = data.datasets[0].data[tooltipItem.index]
                const percentage = assetTypeValue/totalAssets.toFixed(2)

                if (label) {
                  label += ': $'
                }
                // add the total amount
                label += Math.round(assetTypeValue)
                label += " ("
                label += percentage*100
                label += "% of total assets)"
                return label
            }
        }
    }
      
      const assetsChart = new Chart(chartContainer, {
        type: 'pie',
        data: chartData,
        options: chartOptions
      })
    })

    // create a fetch request to our API for the plan-chart
    const planContainer = document.getElementById("plan-chart")

    localAdapter.getPlanChart()
    .then(response => {
      chart_data = response['data']
      // add coloring to each asset type
      chart_data["labels"].forEach(function(label) {
        chart_data["datasets"][0]["backgroundColor"].push(themeColor(label))
      })

      const planChart = new Chart(planContainer, {
        type: 'pie',
        data: chart_data,
        options: response["options"]
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
    <canvas id="myChart"></canvas>` // WHY IS THIS HERE?? -- GANESH

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

    // link button
    const linkButton = document.getElementById('link-button')
    linkButton.addEventListener('click', plaidOpenHandler)

    //view user data
    const viewButton = document.getElementById('profile-button')
    viewButton.addEventListener('click', function(e){
      viewProfile()

    })
    
    //locate actions div
    const actionDiv = document.getElementById('actions')
    actionDiv.innerHTML = ""
    
    localAdapter.getUser()
    .then(data => {
      //calculate networth by asset and total
      let allohash = calType(data.assets)
      let totMon = calTotal(data.assets)
      //calculate wanted networth by asset
      let iplan = idealPlan(data.plan, totMon)
      //compare two value allocation
      let comResult = compare(allohash, iplan)
      console.log(allohash)
      //div for Actions
      actionDiv.innerHTML += `<h4 class="white">Possible Actions:</h4>`
      //create list with id=actionList
      ul = document.createElement('ul')
      ul.setAttribute("id", "actionList")
      actionDiv.appendChild(ul)

      Object.keys(comResult).forEach(function(key) {
        // console.log(key, comResult[key])
        let li = document.createElement('li')
        if (comResult[key] > 0){
          li.appendChild(document.createTextNode(`${key}: buy $${comResult[key]} more`))
          ul.appendChild(li);
        } else if(comResult[key] < 0 ){
          comResult[key] = Math.abs(comResult[key])
          li.appendChild(document.createTextNode(`${key}: sell $${comResult[key]} more`))
          ul.appendChild(li);
        } else {
          li.appendChild(document.createTextNode(`${key}: do nothing`))
          ul.appendChild(li);
        }
      })
    })
}

function showDashboard() {
    main.innerHTML = `<h2>User Dashboard</h2>
    <canvas id="assets-chart" width="600 height="600></canvas>
    <button id="logout-button">Logout</button>
    <div id=financial-plan> </div>
    <button id="edit-button">Edit Plan</button>
    <button id="asset-button">Edit Assets</button>
    <button id="link-button">Link Account</button>
    <button id="profile-button">View Profile</button>`

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



    // create the assets chart, showing past value and a projection for future value
    const chartContainer = document.getElementById("assets-chart")

    // create a fetch request to our API for the data on the user's assets
    fetch(`${BASE_URL}/users/${localStorage.user_id}/getValue`)
    .then(res => res.json())
    .then(data => {
      const assetsChart = new Chart(chartContainer, {
        type: 'pie',
        data: data
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

    // link button
    const linkButton = document.getElementById('link-button')
    linkButton.addEventListener('click', plaidOpenHandler)

    //view user data
    const viewButton = document.getElementById('profile-button')
    viewButton.addEventListener('click', function(e){
      viewProfile()

    })
        

    
}
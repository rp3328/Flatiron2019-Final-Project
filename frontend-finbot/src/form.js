//view profile
function viewProfile(){
    localAdapter.getUser()
    .then(data => {
        main.innerHTML = `
        <h2 class="center"> ${data.first_name} ${data.last_name}'s Profile</h2>
        <div class="profile">
            <h3> Username: ${data.username}</h3> 
            <h3> Email: ${data.email}</h3>
            <h3> Telephone: ${data.telephone}</h3>
            <h3> Age: ${data.age}</h3>
                <button id="back-dashboard" class="btn btn-success btn-lg btn-block"> DashBoard</button>
                <button id="edit-profile" class="btn btn-success btn-lg btn-block"> Edit Profile </button>
        </div>
        `
        //back to dashbaord
        const backButton = document.getElementById('back-dashboard')
        backButton.addEventListener('click', function(e){
          showDashboard()
        })
        const editProfileButton = document.getElementById('edit-profile')
        editProfileButton.addEventListener('click', function(e){
          editProfile()
        })
    })
}

//edit financial plan
function editPlan(){
    localAdapter.getPlan()
    .then(plan => {
    main.innerHTML = `<div class="logimg">
    <div class="body">
        <body>     
            <form id="edit-plan-form" >
                <div class="signup">
                    <h2 class="ctitle">Edit your financial plan</h2>
                <p class="hint-text">Make changes to your financial plan by inputting the fraction of assets that should be invested in each category. All categories must add up to 1.</p>
                
                <br>
                <div class="form-group">
                    <label for="cash-field">Cash:</label>
                    <input id="cash-field" min="0" max="1" type="number" step="0.01" class="form-control" name="cash" value="${plan.cash}" required="required">
                </div>
                <div class="form-group">
                    <label for="derivative-field">Derivatives:</label>
                    <input id="derivative-field" min="0" max="1" type="number" step="0.01" class="form-control" name="derivative" value="${plan.derivative}" required="required">
                </div>
                <div class="form-group">
                    <label for="equity-field">Equities:</label>
                    <input id="equity-field" min="0" max="1" type="number" step="0.01" class="form-control" name="equity" value="${plan.equity}" required="required">
                </div>
                <div class="form-group">
                    <label for="etf-field">Exchange Traded Funds (ETFs):</label>
                    <input id="etf-field" min="0" max="1" type="number" step="0.01" class="form-control" name="etf" value="${plan.etf}" required="required">
                </div>
                <div class="form-group">
                    <label for="fixed_income-field">Fixed Income Products (e.g., bonds):</label>
                    <input id="fixed_income-field" min="0" max="1" type="number" step="0.01" class="form-control" name="fixed_income" value="${plan.fixed_income}" required="required">
                </div>
                <div class="form-group">
                    <label for="loan-field">Loans:</label>
                    <input id="loan-field" min="0" max="1" type="number" step="0.01" class="form-control" name="loan" value="${plan.loan}" required="required">
                </div>
                <div class="form-group">
                    <label for="mutual_fund-field">Mutual Funds:</label>
                    <input id="mutual_fund-field" min="0" max="1" type="number" step="0.01" class="form-control" name="mutual_fund" value="${plan.mutual_fund}" required="required">
                </div>
                <div class="form-group">
                    <label for="other-field">Other Assets:</label>
                    <input id="other-field" min="0" max="1" type="number" step="0.01" class="form-control" name="other" value="${plan.other}" required="required">
                </div>               
                <div class="form-group">
                    <button type="submit" class="btn btn-success btn-lg btn-block">Update Plan</button>
                </div>
            </form>
 
            </div>`
    
    //retrieve plan id specific to user
    const plan_id = localStorage.plan_id
    //patch database
    const planForm = document.getElementById('edit-plan-form')
    planForm.addEventListener('submit', function(e){
        e.preventDefault()
        const cash = e.target[0].value
        const derivative = e.target[1].value
        const equity = e.target[2].value
        const etf  = e.target[3].value
        const fixed_income = e.target[4].value
        const loan  = e.target[5].value
        const mutual_fund = e.target[6].value
        const other  = e.target[7].value
    
        const plan = {
            "cash": cash,
            "derivative": derivative,
            "equity": equity,
            "etf": etf,
            "fixed_income": fixed_income,
            "loan": loan,
            "mutual_fund": mutual_fund,
            "other": other,
            "user_id": localStorage.user_id
        }
        

        localAdapter.patchPlan(plan)
        .then(data => {
            if(!(data.error == null)){
                const planForm = document.getElementById('edit-plan-form')
                alertError(planForm, data.error)
            }else{
                showDashboard()
            }
        })
    })
})
   
}


function editProfile(){
    localAdapter.getUser()
    // pre-populates form with placeholder text indicating current values
    .then(user => {

    main.innerHTML = `<h3>Edit user</h3> 
    <form id="edit-signup-form">
        First name: 
        <input type="text" name="first_name" value="${user.first_name}" placeholder="${user.first_name}"/><br>
        Last name: 
        <input type="text" name="last_name" value="${user.last_name}" placeholder="${user.last_name}"/><br>
        Username: 
        <input type="text" name="username" value="${user.username}" placeholder="${user.username}"/><br>
        Email: 
        <input type="text" name="email" value="${user.email}" placeholder="${user.email}"/><br>
        Telephone: 
        <input type="text" name="telephone" value="${user.telephone}" placeholder="${user.telephone}"/><br>
        Age: 
        <input type="number" name="age" value="${user.age}" placeholder="${user.age}"/><br>
        Password: 
        <input type="password" name="password" placeholder="*******"/><br>
        Confirm password: 
        <input type="password" name="password_confirmation" placeholder="*******"/><br>
        <input type="submit"/>
    </form>`        

// edits user info
    const signupForm = document.getElementById('edit-signup-form')
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

        //checks if password was altered
        let verhash = {}
        if (password === ""){
            
            verhash = {"first_name": first_name,
            "last_name": last_name,
            "username": username,
            "email": email,
            "telephone": telephone,
            "age": age}
        } else { 
            verhash = {"first_name": first_name,
            "last_name": last_name,
            "username": username,
            "email": email,
            "telephone": telephone,
            "age": age,
            "password": password,
            "password_confirmation": password_confirmation}
        }

        localAdapter.patchUser(verhash)
        .then(data => {
            if(!(data.error == null)){
                const signupForm = document.getElementById('edit-signup-form')
                alertError(signupForm, data.error)
            }else{
                showDashboard()
            }
        })
    })
})
}

//edit existing or add to assets
function editAssets(){ 
    //render assets template
    main.innerHTML = `
    <div class="logimg">
    <div class="body">
        <body>     
            <form id="asset-form" >
                <div class="signup">
                    <h2 class="ctitle">Input equity holdings</h2>
                <p class="hint-text">Use this form to manually update your equity assets. If you prefer to link your account and create assets automatically, you may do so from the dashboard </p>
                
                <br>
                <div class="form-group">
                    <label for="ticker-field">Ticker Symbol:</label>
                    <input id="ticker-field" type="text" class="form-control" name="ticker_symbol" required="required">
                </div>
                <div class="form-group">
                    <label for="name-field">Company name:</label>
                    <input id="name-field" type="text" class="form-control" name="name" required="required">
                </div>
                <div class="form-group">
                    <label for="quantity-field">Number of shares held:</label>
                    <input id="ticker-field" type="number" min="0" step="0.01" class="form-control" name="quantity" required="required">
                </div>
                <div class="form-group">
                    <label for="cost_basis-field">Cost basis per share:</label>
                    <input id="cost_basis-field" type="number" min="0" step="0.01" class="form-control" name="cost_basis_per_share" required="required">
                </div>
                <div class="form-group">
                    <label for="asset_type-field">Asset Type:</label>
                    <select id="asset_type-field" class="form-control" name="ticker_symbol" required="required">
                        <option value="equity">equity</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-md btn-inline">Add an asset</button>
                </div>
                <div class="form-group">
                    <button id="assets-done" type="button" class="btn btn-success btn-md btn-inline">Finished adding assets</button>
                </div>
            </form>
            <br>

            <table id="assets-table" class="table table-hover">
                <thead>
                    <tr>
                        <th>Ticker symbol</th>
                        <th>Name</th>
                        <th>Number of shares</th>
                        <th>Purchase price per share</th>
                    </tr>
                </thead>
                <tbody id="assets-table-body">
                </tbody>
            </table>
 
            <div class="text-center">Already have an account? <a id="back" href="#">Sign in</a></div>
      
            </div>`

    const assetForm = document.getElementById("asset-form")
    const assetsTableBody = document.getElementById("assets-table-body")
    //retrieve associated assets with user
    localAdapter.getUser()
    .then(data => {
        const user_assets = data.assets
        user_assets.forEach(asset => {assetsTableBody.innerHTML += `
        <tr>
            <td>${asset.ticker_symbol}</td>
            <td>${asset.name}</td>
            <td>${asset.quantity}</td>
            <td>${(asset.cost_basis/asset.quantity).toFixed(2)}</td>
            <td><button id="deletebtn" type="button" class="btn btn-danger" data-id=${asset.id}>delete</button></td>
        </tr>`
        })
    })


    assetForm.addEventListener('submit', function(e){
        e.preventDefault()
        const ticker_symbol = e.target[0].value
        const name = e.target[1].value
        const quantity = e.target[2].value
        const cost_basis = e.target[3].value * quantity
        const asset_type = e.target[4].value

        const asset = {
            "ticker_symbol": ticker_symbol,
            "name": name,
            "quantity": quantity,
            "cost_basis": cost_basis,
            "asset_type": asset_type,
            "user_id": localStorage.user_id
        }

        localAdapter.postAsset(asset)
        .then(asset => {
            if(!(asset.error == null)){
                const assetForm = document.getElementById('asset-form')
                alertError(assetForm, asset.error)
            }else{
            // rewrite the DOM 'assets-table' to include the asset
            assetsTableBody.innerHTML += `
                <tr>
                    <td>${asset.ticker_symbol}</td>
                    <td>${asset.name}</td>
                    <td>${asset.quantity}</td>
                    <td>${(asset.cost_basis/asset.quantity).toFixed(2)}</td>
                    <td><button id="deletebtn" type="button" class="btn btn-danger" data-id=${asset.id}>delete</button></td>
                </tr>`
            }
        })
    })// ends the 'submit' eventListener on the asset form

    //Delete an asset (can be re-added, providing effective 'edit' functionality)
    assetsTableBody.addEventListener('click', function(e){
        if(e.target.id === "deletebtn"){

            let assetId = e.target.dataset.id
            
            localAdapter.deleteAsset(assetId)
            .then(message => {
                editAssets()
            })
        }
    })

    // when the user is finished adding assets, take them to their dashboard
    const finishedAssetsButton = document.getElementById("assets-done")
    finishedAssetsButton.addEventListener('click', function(e) {
        showDashboard()
    })


}





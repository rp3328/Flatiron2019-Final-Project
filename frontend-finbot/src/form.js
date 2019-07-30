//view profile
function viewProfile(){
    fetch(`${BASE_URL}/users/${localStorage.user_id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        main.innerHTML = `
        <h1> Username: ${data.username}</h1>
        <h2> FullName: ${data.first_name} ${data.last_name}</h2>
        <h2> Age: ${data.age}</h2>
        <button id="back-dashboard"> DashBoard</button>
        <button id="edit-profile"> Edit Profile </button>
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
    main.innerHTML = `<h1>Edit Your Plan</h1>
    <form id="edit-plan-form">
        Cash:
        <input type="number" step="0.001" name="cash"/><br>
        Derivatives:
        <input type="number" step="0.001" name="derivative"/><br>
        Equity:
        <input type="number" step="0.001" name="equity"/><br>
        Exchange Traded Funds:
        <input type="number" step="0.001" name="etf"/><br>
        Fixed Income Securities:
        <input type="number" step="0.001" name="fixed_income"/><br>
        Loans:
        <input type="number" step="0.001" name="loan"/><br>
        Mutual Funds:
        <input type="number" step="0.001" name="mutual_fund"/><br>
        Other assets:
        <input type="number" step="0.001" name="other"/><br>
        <input type="submit"/>
    </form>`
    
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
    fetch(`${BASE_URL}/plans/${plan_id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            "cash": cash,
            "derivative": derivative,
            "equity": equity,
            "etf": etf,
            "fixed_income": fixed_income,
            "loan": loan,
            "mutual_fund": mutual_fund,
            "other": other,
            "user_id": localStorage.user_id
        })
        })
        .then(res => res.json())

        showDashboard()
    })
   

}


function editProfile(){
    main.innerHTML = `<h1>Edit user</h1> 
    <form id="edit-signup-form">
        First name: 
        <input type="text" name="first_name"/><br>
        Last name: 
        <input type="text" name="last_name"/><br>
        Username: 
        <input type="text" name="username"/><br>
        Age: 
        <input type="number" name="age"/><br>
        Password: 
        <input type="password" name="password"/><br>
        Confirm password: 
        <input type="password" name="password_confirmation"/><br>
        <input type="submit"/>
    </form>`

// edits user info
    const signupForm = document.getElementById('edit-signup-form')
    signupForm.addEventListener('submit',function(e) {
        e.preventDefault()
        
        const first_name = e.target[0].value
        const last_name = e.target[1].value
        const username = e.target[2].value
        const age  = e.target[3].value
        const password = e.target[4].value
        const password_confirmation  = e.target[5].value

        //checks if password was altered
        let verhash = {}
        if (password === ""){
            
            verhash = {"first_name": first_name,
            "last_name": last_name,
            "username": username,
            "age": age}
        } else { 
            verhash = {"first_name": first_name,
            "last_name": last_name,
            "username": username,
            "age": age,
            "password": password,
            "password_confirmation": password_confirmation}
        }

        fetch(`${BASE_URL}/users/${localStorage.user_id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(
                verhash
            )
        })
        .then(res => res.json())
        showDashboard()
        
    })
}

//edit existing or add to assets
function editAssets(){ 
    //render assets template
    main.innerHTML = `<h1>Edit Assets</h1> 
    <form id="asset-form">
        Ticker: 
        <input type="text" step="0.001" name="ticker"/><br>
        Shares: 
        <input type="number" step="0.001" name="shares"/><br>
        Price: 
        <input type="number" step="0.001" name="price"/><br>
        Purchase Date: 
        <input type="datetime" step="0.001" name="purchase_date"/><br>
        Asset Type: 
        <select name="asset_type" >
            <option value="cash">cash</option>
            <option value="derivative">derivative</option>
            <option value="equity">equity</option>
            <option value="etf">ETF</option>
            <option value="fixed_income">fixed_income</option>
            <option value="loan">loan</option>
            <option value="mutual_fund">mutual_fund</option>
            <option value="other">other</option>
        </select><br>
        <input type="submit"/>
    </form>
    <button id="assets-done">Finished adding assets</button>
    <br>
        
    <table id="assets-table">
    <tr>
    <th>Ticker symbol</th>
    <th>Number of shares</th>
    <th>Purchase price per share</th>
    </tr>
    
    </table>`

    const assetForm = document.getElementById("asset-form")
    const assetsTable = document.getElementById("assets-table")
    //retrieve associated assets with user
    fetch(`${BASE_URL}/users/${localStorage.user_id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.assets[0])
        const user_assets = data.assets
        user_assets.forEach(asset => {assetsTable.innerHTML += `
        <tr>
            <td>${asset.ticker}</td>
            <td>${asset.shares}</td>
            <td>${asset.price}</td>
            <td><button id="editbtn" data-id=${asset.id}>edit</button></td>`
        })
    })

    // submits the financial plan form
    assetForm.addEventListener('submit', function(e){
        e.preventDefault()
        const ticker = e.target[0].value
        const shares = e.target[1].value
        const price = e.target[2].value
        const purchase_date  = e.target[3].value
        const asset_type = e.target[4].value

        fetch(`${BASE_URL}/assets`,{
            method: "POST", 
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                "ticker": ticker,
                "shares": shares,
                "price": price,
                "purchase_date": purchase_date,
                "asset_type": asset_type,
                "user_id": localStorage.user_id
            })
            })
            .then(res => res.json())
            .then(asset => {

                // rewrite the DOM 'assets-table' to include the asset
                assetsTable.innerHTML += `
                <tr>
                    <td>${asset.ticker}</td>
                    <td>${asset.shares}</td>
                    <td>${asset.price}</td>
                    <td><button id="editbtn" data-id=${asset.id}>edit</button></td>`
            })
    })// ends the 'submit' eventListener on the asset form

    //edit existing assets
    assetsTable.addEventListener('click', function(e){
        if(e.target.id === "editbtn"){
            console.log(e.target)
            fetch(`${BASE_URL}/assets/${e.target.dataset.id}`, {
                method: "DELETE",
            })
            .then(resp=> resp.json)
            .then(message => console.log(message))
            editAssets()
        }
    })

    // when the user is finished adding assets, take them to their dashboard
    const finishedAssetsButton = document.getElementById("assets-done")
    finishedAssetsButton.addEventListener('click', function(e) {
        showDashboard()
    })


}
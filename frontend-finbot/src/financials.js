// brings up a form for creating a financial plan
function showFinancialPlan() {
    main.innerHTML = `
    <div class="logimg">
    <div class="body">
        <body>     
            <form id="plan-form" >
                <div class="signup">
                    <h2 class="ctitle">Setup a financial plan</h2>
                <p class="hint-text">Create your financial plan. Input the fraction of assets that should be invested in each category. All categories must add up to 1.</p>
                
                <br>
                <div class="form-group">
                    <label for="cash-field">Cash:</label>
                    <input id="cash-field" min="0" max="1" type="number" step="0.01" class="form-control" name="cash" required="required">
                </div>
                <div class="form-group">
                    <label for="derivative-field">Derivatives:</label>
                    <input id="derivative-field" min="0" max="1" type="number" step="0.01" class="form-control" name="derivative" required="required">
                </div>
                <div class="form-group">
                    <label for="equity-field">Equities:</label>
                    <input id="equity-field" min="0" max="1" type="number" step="0.01" class="form-control" name="equity" required="required">
                </div>
                <div class="form-group">
                    <label for="etf-field">Exchange Traded Funds (ETFs):</label>
                    <input id="etf-field" min="0" max="1" type="number" step="0.01" class="form-control" name="etf" required="required">
                </div>
                <div class="form-group">
                    <label for="fixed_income-field">Fixed Income Products (e.g., bonds):</label>
                    <input id="fixed_income-field" min="0" max="1" type="number" step="0.01" class="form-control" name="fixed_income" required="required">
                </div>
                <div class="form-group">
                    <label for="loan-field">Loans:</label>
                    <input id="loan-field" min="0" max="1" type="number" step="0.01" class="form-control" name="loan" required="required">
                </div>
                <div class="form-group">
                    <label for="mutual_fund-field">Mutual Funds:</label>
                    <input id="mutual_fund-field" min="0" max="1" type="number" step="0.01" class="form-control" name="mutual_fund" required="required">
                </div>
                <div class="form-group">
                    <label for="other-field">Other Assets:</label>
                    <input id="other-field" min="0" max="1" type="number" step="0.01" class="form-control" name="other" required="required">
                </div>               
                <div class="form-group">
                    <button type="submit" class="btn btn-success btn-lg btn-block">Create Plan</button>
                </div>
            </form>
 
                <div class="text-center">Already have an account? <a id="back" href="#">Sign in</a></div>
      
            </div>
            `
    const planForm = document.getElementById('plan-form')
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
        
        plan = {
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

        localAdapter.postPlan(plan).then(data => {
            localStorage.setItem("plan_id", data.id)
    
        })
        inputAssets()
    })
 }
    

function inputAssets(){
    main.innerHTML = `
    <div class="logimg">
    <div class="body">
        <body>     
            <form id="asset-form" >
                <div class="signup">
                    <h2 class="ctitle">Input equity holdings</h2>
                <p class="hint-text">Use this form to manually input your equity assets. If you prefer to link your account and create assets automatically, you may do so from the dashboard </p>
                
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

    assetForm.addEventListener('submit', function(e){
        e.preventDefault()
        const ticker_symbol = e.target[0].value
        const name = e.target[1].value
        const quantity = e.target[2].value
        const cost_basis = e.target[3].value * quantity
        const asset_type = e.target[4].value

        asset = {
            "ticker_symbol": ticker_symbol,
            "name": name,
            "quantity": quantity,
            "cost_basis": cost_basis,
            "asset_type": asset_type,
            "user_id": localStorage.user_id
        }

        localAdapter.postAsset(asset).then(asset => {

            // rewrite the DOM 'assets-table' to include the asset
            assetsTableBody.innerHTML += `
            <tr>
                <td>${asset.ticker_symbol}</td>
                <td>${asset.name}</td>
                <td>${asset.quantity}</td>
                <td>${(asset.cost_basis/asset.quantity).toFixed(2)}</td>
            </tr>`
        })            
    })// ends the 'submit' eventListener on the asset form

    // when the user is finished adding assets, take them to their dashboard
    const finishedAssetsButton = document.getElementById("assets-done")
    finishedAssetsButton.addEventListener('click', function(e) {
        showDashboard()
    })
}


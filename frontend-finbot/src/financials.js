// brings up a form for creating a financial plan
function showFinancialPlan() {
    main.innerHTML = `<h1>Setup New Plan</h1>
    <form id="plan-form">
        Small Cap Equities:
        <input type="number" step="0.001" name="equity_smcap"/><br>
        Middle Cap Equities:
        <input type="number" step="0.001" name="equity_micap"/><br>
        Large Cap Equities:
        <input type="number" step="0.001" name="equity_lgcap"/><br>
        High Yield Bonds:
        <input type="number" step="0.001" name="bond_hy"/><br>
        Low Yield Bonds:
        <input type="number" step="0.001" name="bond_ly"/><br>
        Municipal Bonds:
        <input type="number" step="0.001" name="bond_muni"/><br>
        Treasury Bonds:
        <input type="number" step="0.001" name="bond_t"/><br>
        Cash:
        <input type="number" step="0.001" name="cash"/><br>
        <input type="submit"/>
    </form>`
    const planForm = document.getElementById('plan-form')
    planForm.addEventListener('submit', function(e){
        e.preventDefault()
        const equity_smcap = e.target[0].value
        const equity_micap = e.target[1].value
        const equity_lgcap = e.target[2].value
        const bond_hy  = e.target[3].value
        const bond_ly = e.target[4].value
        const bond_muni  = e.target[5].value
        const bond_t = e.target[6].value
        const cash  = e.target[7].value
    fetch(`${BASE_URL}/plans`,{
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            "equity_smcap": equity_smcap,
            "equity_micap": equity_micap,
            "equity_lgcap": equity_lgcap,
            "bond_hy": bond_hy,
            "bond_ly": bond_ly,
            "bond_muni": bond_muni,
            "bond_t": bond_t,
            "cash": cash,
            "user_id": localStorage.user_id
        })
        })
        .then(res => res.json())
        inputAssets()
    })
 }
    

function inputAssets(){

    
    main.innerHTML = `<h1>Setup New Plan</h1> 
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
            <option value="equity_smcap">equity_smcap</option>
            <option value="equity_micap">equity_micap</option>
            <option value="equity_lgcap">equity_lgcap</option>
            <option value="bond_hy">bond_hy</option>
            <option value="bond_ly">bond_ly</option>
            <option value="bond_muni">bond_muni</option>
            <option value="bond_t">bond_t</option>
            <option value="cash">cash</option>
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
                    <td>${asset.price}</td>`
            })            
    })// ends the 'submit' eventListener on the asset form

    // when the user is finished adding assets, take them to their dashboard
    const finishedAssetsButton = document.getElementById("assets-done")
    finishedAssetsButton.addEventListener('click', function(e) {
        showDashboard()
    })
}
// brings up a form for creating a financial plan
function showFinancialPlan() {
    main.innerHTML = `<h1>Setup New Plan</h1>
    <form id="plan-form">
        Cash:
        <input type="number" step="0.001" name="cash"/><br>
        Derivatives:
        <input type="number" step="0.001" name="derivative"/><br>
        Equity:
        <input type="number" step="0.001" name="equity"/><br>
        ETF:
        <input type="number" step="0.001" name="etf"/><br>
        Fixed Income:
        <input type="number" step="0.001" name="fixed_income"/><br>
        Loans:
        <input type="number" step="0.001" name="loan"/><br>
        Mutual Funds:
        <input type="number" step="0.001" name="mutual_fund"/><br>
        Other:
        <input type="number" step="0.001" name="other"/><br>
        <input type="submit"/>
    </form>`
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
    fetch(`${BASE_URL}/plans`,{
        method: "POST",
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
        .then(data => {
            localStorage.setItem("plan_id", data.id)
    
        })
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
            <option value="cash">cash</option>
            <option value="derivative">derivative</option>
            <option value="equity">equity</option>
            <option value="etf">etf</option>
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
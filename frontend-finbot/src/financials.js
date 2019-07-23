// brings up a form for creating a financial plan
function showFinancialPlan(data) {
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
            "user_id": data.id
        })
        })
        .then(res => res.json())
        showAssets(data)
    })
 }
    

function showAssets(data){
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
        <input type="number" step="1" name="asset_type"/><br>
        <input type="submit"/>
    </form>`



    const assetForm = document.getElementById("asset-form")

    // submits the financial plan form
    assetForm.addEventListener('submit', function(e){
        e.preventDefault()
        const ticker = e.target[0].value
        const shares = e.target[1].value
        const price = e.target[2].value
        const purchase_date  = e.target[3].value
        const asset_type_id = e.target[4].value

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
                "asset_type_id": asset_type_id,
                "user_id": data.id
            })
            })
            .then(res => res.json())
            
        showDashboard(data)
    })
}
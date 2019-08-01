const localAdapter = new LocalAdapter("http://localhost:3000")
const main = document.querySelector('main')
const themeColor = function(asset_type=null) {
    const palette_without_names = ["#479698", "#3d7fae", "#012d4f", "#a9b4c1", "#dbe4e7"]
    const palette_with_names = {
        "cash": "#479698",
        "derivative": "#3d7fae",
        "equity": "#012d4f",
        "etf": "#a9b4c1",
        "fixed_income": "#dbe4e7",
        "loan": "#479698",
        "mutual fund": "#3d7fae",
        "other":  "#012d4f"
    }
    let i=1 
    if(asset_type === null) {
        return palette_without_names[i%5]
        i++
    } else {
        return palette_with_names[asset_type]
    }
    return 
}

document.addEventListener('DOMContentLoaded', function(){

    showLoginScreen()
    if(typeof(parseInt(localStorage.getItem('user_id'))) === "integer") {
        // if the user ID is found, that means we've logged in
        showDashboard(user)

    } else {
        // go back to the login screen with an error message
        showLoginScreen()
    }

})
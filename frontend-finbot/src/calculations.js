//create hash with keys of assettypeid and total value under each type
function calType(assets){
    // nhash = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}
    nhash = {"cash":0, "derivative":0, "equity":0, "etf":0, "fixed_income":0, "loan":0, "mutual_fund":0, "other":0}
    // console.log(nhash)
    assets.forEach(asset =>{
      console.log(asset)
      if(asset.asset_type_name === "cash"){
        let sum = asset.close_price * asset.quantity
        nhash["cash"] += sum
      } else if (asset.asset_type_name === "derivative"){
        let sum = asset.close_price * asset.quantity
        nhash["derivative"] += sum
      } else if (asset.asset_type_name === "equity"){
        let sum = asset.close_price * asset.quantity
        nhash["equity"] += sum
      } else if (asset.asset_type_name === "etf"){
        let sum = asset.close_price * asset.quantity
        nhash["etf"] += sum
      } else if (asset.asset_type_name === "fixed_income"){
        let sum = asset.close_price * asset.quantity
        nhash["fixed_income"] += sum
      } else if (asset.asset_type_name === "loan"){
        let sum = asset.close_price * asset.quantity
        nhash["loan"] += sum
      } else if (asset.asset_type_name === "mutual_fund"){
        let sum = asset.close_price * asset.quantity
        nhash["mutual_fund"] += sum
      } else if (asset.asset_type_name === "other"){
        let sum = asset.close_price * asset.quantity
        nhash["other"] += sum
      }
    })
    console.log(nhash)
    return nhash
  }
  
  //calculate total networth by assets
  function calTotal(assets){
    var num = 0
    assets.forEach(asset => {
      let sum = asset.close_price * asset.quantity
      num += sum
    })
    // console.log(num)
    return num
  }

  //hash of percentage allocation of assets
  function calAllo(hash, tot){
    Object.keys(hash).forEach(function(key){
      hash[key] = hash[key]/ tot
    });
    return hash
  }

  //net value allocation of projected plan
  function idealPlan(plan, tot){
    Object.keys(plan).forEach(function(key){
      if (!(key == "id" || key == "user_id" || key == "created_at" || key == "updated_at")){
        plan[key] = plan[key] * tot
      }
    });
    console.log(plan)
    return plan
  }

  function compare(curPlan, futurePlan){
    
  }

  function comparePlan(hash, tot, plan){
      console.log(hash)
      console.log(tot)
      console.log(plan)
  //multiply total to plan = what we need for that 

  }


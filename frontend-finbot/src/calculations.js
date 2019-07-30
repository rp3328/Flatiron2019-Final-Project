//create hash with keys of assettypeid and total value under each type
function calType(assets){
    
    // nhash = {"cash":0, "derivative":0, "equity":0, "etf":0, "fixed_income":0, "loan":0, "mutual_fund":0, "other":0}
    // console.log(nhash)
    // assets.forEach(asset =>{
    //   console.log(asset)
    //   if(asset.asset_type_name === "cash"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["cash"] += sum
    //   } else if (asset.asset_type_name === "derivative"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["derivative"] += sum
    //   } else if (asset.asset_type_name === "equity"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["equity"] += sum
    //   } else if (asset.asset_type_name === "etf"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["etf"] += sum
    //   } else if (asset.asset_type_name === "fixed_income"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["fixed_income"] += sum
    //   } else if (asset.asset_type_name === "loan"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["loan"] += sum
    //   } else if (asset.asset_type_name === "mutual_fund"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["mutual_fund"] += sum
    //   } else if (asset.asset_type_name === "other"){
    //     let sum = asset.close_price * asset.quantity
    //     nhash["other"] += sum
    //   }
    // })

    nhash = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}

    assets.forEach(asset =>{
      console.log(asset)
      if(asset.asset_type_id === 1){
        let sum = asset.close_price * asset.quantity
        nhash[1] += sum
      } else if (asset.asset_type_id === 2){
        let sum = asset.close_price * asset.quantity
        nhash[2] += sum
      } else if (asset.asset_type_id === 3){
        let sum = asset.close_price * asset.quantity
        nhash[3] += sum
      } else if (asset.asset_type_id === 4){
        let sum = asset.close_price * asset.quantity
        nhash[4] += sum
      } else if (asset.asset_type_id === 5){
        let sum = asset.close_price * asset.quantity
        nhash[5] += sum
      } else if (asset.asset_type_id === 6){
        let sum = asset.close_price * asset.quantity
        nhash[6] += sum
      } else if (asset.asset_type_id === 7){
        let sum = asset.close_price * asset.quantity
        nhash[7] += sum
      } else if (asset.asset_type_id === 8){
        let sum = asset.close_price * asset.quantity
        nhash[8] += sum
      }
    })

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

    return hash
  }

  //net value allocation of projected plan
  function idealPlan(plan, tot){
    Object.keys(plan).forEach(function(key){
      if (!(key == "id" || key == "user_id" || key == "created_at" || key == "updated_at")){
        plan[key] = plan[key] * tot
      }
    });
    // console.log(plan)
    return plan
  }

  //creates new hash with difference in value for each key
  function compare(curPlan, futurePlan){
    // console.log(curPlan)
    // console.log(futurePlan)
    Object.keys(futurePlan).forEach(function(key){
      if (key === "cash"){
        futurePlan[key] = futurePlan[key] - curPlan[1]
      } else if(key === "derivative"){
        futurePlan[key] = futurePlan[key] - curPlan[2]
      } else if(key === "equity"){
        futurePlan[key] = futurePlan[key] - curPlan[3]
      } else if(key === "etf"){
        futurePlan[key] = futurePlan[key] - curPlan[4]
      } else if(key === "fixed_income"){
        futurePlan[key] = futurePlan[key] - curPlan[5]
      } else if(key === "loan"){
        futurePlan[key] = futurePlan[key] - curPlan[6]
      } else if(key === "mutual_fund"){
        futurePlan[key] = futurePlan[key] - curPlan[7]
      } else if(key === "other"){
        futurePlan[key] = futurePlan[key] - curPlan[8]
      }
    });
    console.log(futurePlan)
    return futurePlan
  }

  function solution(result){
    
    // Object.keys(futurePlan).forEach(function(key){
    //   if(futurePlan[key] < 0)
    // })
      delete result["id"]
      delete result["user_id"]
      delete result["created_at"]
      delete result["updated_at"]
      console.log(result)
      return result
  }


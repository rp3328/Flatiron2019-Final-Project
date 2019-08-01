//create hash with keys of assettypeid and total value under each type
function calType(assets){
    nhash = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}

    assets.forEach(asset => {
      let sum = asset.close_price * asset.quantity
      nhash[asset.asset_type_id] += sum
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
    return num
  }

  //net value allocation of projected plan
  function idealPlan(plan, tot){
    Object.keys(plan).forEach(function(key){
      if (!(key == "id" || key == "user_id" || key == "created_at" || key == "updated_at")){
        plan[key] = plan[key] * tot
      }
    });
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
    delete futurePlan["id"]
    delete futurePlan["user_id"]
    delete futurePlan["created_at"]
    delete futurePlan["updated_at"]
    return futurePlan
  }



//create hash with keys of assettypeid and total value under each type
function calType(assets){
    nhash = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}
    // console.log(nhash)
    assets.forEach(asset =>{
      if(asset.asset_type_id === 1){
        let sum = asset.price * asset.shares
        nhash[1] += sum
      } else if (asset.asset_type_id === 2){
        let sum = asset.price * asset.shares
        nhash[2] += sum
      } else if (asset.asset_type_id === 3){
        let sum = asset.price * asset.shares
        nhash[3] += sum
      } else if (asset.asset_type_id === 4){
        let sum = asset.price * asset.shares
        nhash[4] += sum
      } else if (asset.asset_type_id === 5){
        let sum = asset.price * asset.shares
        nhash[5] += sum
      } else if (asset.asset_type_id === 6){
        let sum = asset.price * asset.shares
        nhash[6] += sum
      } else if (asset.asset_type_id === 7){
        let sum = asset.price * asset.shares
        nhash[7] += sum
      } else if (asset.asset_type_id === 8){
        let sum = asset.price * asset.shares
        nhash[8] += sum
      }
    //   console.log(nhash)
    return nhash
  
    })
  }
  
  //calculate total networth by assets
  function calTotal(assets){
    var num = 0
    assets.forEach(asset => {
      let sum = asset.price * asset.shares
      num += sum
    })
    // console.log(num)
    return num
  }

  function comparePlan(hash, tot, plan){
      console.log(hash)
      console.log(tot)
      console.log(plan)

      

  }


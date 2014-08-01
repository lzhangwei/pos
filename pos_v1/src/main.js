function printInventory(inputs){
  var allItems = loadAllItems();
  var allPromotions = loadPromotions();
  var allPromotionItems = loadPromotions()[0].barcodes;
  var quantitys = [];
  for(var i=0;i<inputs.length;i++){
    var itemBarcode = inputs[i];
    var quantity = 1;
    if(itemBarcode.length>10){
      var itemSpilt = itemBarcode.split('-');
      itemBarcode = itemSpilt[0];
      quantity = Number(itemSpilt[1]);
    }
    for(var j=0;j<allItems.length;j++){
      if(itemBarcode == allItems[j].barcode){
        if(quantitys[j]==undefined)
          quantitys[j] = 0;
        quantitys[j] += quantity;
        break;
      }
    }
  }
  var commonOutput = '';
  var presenterOutput = '';
  var priceSum = 0;
  var priceSave = 0;
  for(var i=0;i<quantitys.length;i++){
    if(quantitys[i]>0){
      var tag = 0;
      for(var j=0;j<allPromotionItems.length;j++){
        if(allPromotionItems[j]==allItems[i].barcode && quantitys[i]>2){
          tag = 1;
          break;
        }
      }
      var price = allItems[i].price*quantitys[i];
      if(tag==1){
        var quantityReduce = Math.floor(quantitys[i]/3);
        var priceReduce = allItems[i].price*quantityReduce;
        priceSave += priceReduce;
        priceSum += price - priceReduce;
        commonOutput += makeCommonOutput(allItems[i].name,quantitys[i],allItems[i].unit,allItems[i].price.toFixed(2),(price - priceReduce).toFixed(2));
        presenterOutput += makePresenterOutput(allItems[i].name,quantityReduce,allItems[i].unit);
      }else{
        priceSum += allItems[i].price*quantitys[i];
        commonOutput += makeCommonOutput(allItems[i].name,quantitys[i],allItems[i].unit,allItems[i].price.toFixed(2),price.toFixed(2));
      }
    }
  }
  var output = '***<没钱赚商店>购物清单***\n';
  output += commonOutput;
  output += '----------------------\n挥泪赠送商品：\n';
  output += presenterOutput;
  output += '----------------------\n总计：' + priceSum.toFixed(2) + '(元)\n';
  output += '节省：' + priceSave.toFixed(2) + '(元)\n**********************';
  console.log(output);
}
function makeCommonOutput(name,quantity,unit,price,totalPrice){
  var result = '名称：' + name + '，数量：' + quantity + unit + '，单价：' + price + '(元)，小计：' + totalPrice + '(元)' + '\n';
  return result;
}
function makePresenterOutput(name,quantity,unit){
  var result = '名称：' + name + '，数量：' + quantity + unit + '\n';
  return result;
}

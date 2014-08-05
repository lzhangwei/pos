function printInventory(inputs) {

  var allItems = loadAllItems();

  var quantitys = calculateQuantitys(inputs, allItems);

  printList(quantitys, allItems);
}

function getAllPromotionBarcodeList(promotionType) {

  var allPromotions = loadPromotions();

  var allPromotionBarcodeList;
  for(var i=0; i<allPromotions.length; i++){
    if(allPromotions[i].type == promotionType){
      allPromotionBarcodeList = allPromotions[i].barcodes;
      break;
    }
  }

  return allPromotionBarcodeList;
}

function calculateQuantitys(inputs, allItems) {

  var quantitys = [];

  for(var i = 0; i < inputs.length; i++){

    var itemSpilt = inputs[i].split('-');
    var itemBarcode = itemSpilt[0];
    var quantity = Number(itemSpilt[1]) || 1;

    for(var j=0; j < allItems.length; j++){
      if(itemBarcode == allItems[j].barcode){
        if(quantitys[j] == undefined)
          quantitys[j] = 0;
        quantitys[j] += quantity;
        break;
      }
    }
  }
  return quantitys;
}

function isPromotionItem(item, quantity) {

  var allPromotionBarcodeList = getAllPromotionBarcodeList('BUY_TWO_GET_ONE_FREE')

  for(var j = 0; j < allPromotionBarcodeList.length; j++){
    if(allPromotionBarcodeList[j] === item.barcode && quantity > 2){
      return true;
    }
  }

  return false;
}

function printList(quantitys, allItems) {
  var commonOutput = '***<没钱赚商店>购物清单***\n';
  var presenterOutput = '----------------------\n挥泪赠送商品：\n';
  var priceSum = 0;
  var priceSave = 0;

  for(var i = 0; i < quantitys.length; i++){

    if(quantitys[i]>0){

      var price = allItems[i].price*quantitys[i];
      var quantityReduce = Math.floor(quantitys[i] / 3);
      var priceReduce = allItems[i].price * quantityReduce;
      priceSave += priceReduce;
      priceSum += price - priceReduce;
      commonOutput += '名称：' + allItems[i].name + '，数量：'
                      + quantitys[i] + allItems[i].unit + '，单价：'
                      + allItems[i].price.toFixed(2) + '(元)，小计：'
                      + (price - priceReduce).toFixed(2) + '(元)' + '\n';

      if(isPromotionItem(allItems[i], quantitys[i])){
        presenterOutput += '名称：' + allItems[i].name + '，数量：'
                          + quantityReduce + allItems[i].unit + '\n';
      }
    }
  }

  var output = commonOutput;
  output += presenterOutput;
  output += '----------------------\n总计：' + priceSum.toFixed(2) + '(元)\n';
  output += '节省：' + priceSave.toFixed(2) + '(元)\n**********************';
  console.log(output);
}

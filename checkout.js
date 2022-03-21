

    function createCheckoutProductCard(obj) {

        var card = document.createElement('div');
        card.classList.add('checkout-card');

        var firstInnerDiv = document.createElement('div');
        var productImg = document.createElement('img');
        productImg.classList.add('checkout-product-img');
        productImg.src = obj.preview;
        firstInnerDiv.appendChild(productImg);

        var secondInnerDiv = document.createElement('div');
        var productName = document.createElement('h4');
        productName.innerHTML = obj.name;

        var productCount = document.createElement('p');
        productCount.innerHTML = 'x'+ obj.count;

        var amountLabel = document.createElement('span');
        amountLabel.innerHTML = 'Amount: Rs ';

        var amountSpan = document.createElement('span');
        amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price);

        var productAmount = document.createElement('p');

        var Rdiv = document.createElement("div")
        Rdiv.className = "btn"
        Rdiv.innerHTML = `<button  
         id = "btnEdit" onclick = "removediv(${i})">X
        </button>`
    
        productAmount.append(amountLabel,amountSpan);

        secondInnerDiv.append(productName,productCount,productAmount);

        card.append(firstInnerDiv,secondInnerDiv,Rdiv);
 
        return card;
           
    }
    

    var productList = localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    var grandTotal = 0;
    for(var i=0; i<productList.length; i++) {
        $('#card-list').append(createCheckoutProductCard(productList[i]));

        var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

    }

    $('#item-count').html(productList.length);
    $('#total-amount').html(grandTotal);

    $('#btn-place-order').click(function() {

        var orderItemArr = [];
        for(var i=0; i<productList.length; i++) {
            var prodObj = {
                "id": productList[i].id,
                "brand": productList[i].brand,
                "name": productList[i].name,
                "price": productList[i].price,
                "preview": productList[i].preview,
                "isAccessory": productList[i].isAccessory   
            }

            orderItemArr.push(prodObj);
        }
        if(grandTotal == 0){
        alert("Please add items in your cart")
        }
        else{
            location.assign('./complete.html');
        }


        var dataObj = {
            amount: grandTotal,
            products: orderItemArr
        }
       
    })

function removediv(i){
    productList.splice(i,1);
    localStorage.setItem("product-list", JSON.stringify(productList))
    location.reload()
}

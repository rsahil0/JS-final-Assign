$(document).ready(function() {
    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    var totalCount = 0;
    for (var i = 0; i < productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }

    $('#cart-count').html(totalCount);
});



$(document).ready(function() {
    $('.center').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    })
});


function createHomePageProductCard(obj) {
  
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('product-card');
    
    var productLink = document.createElement('a');
    productLink.href = './details.html?p=' + obj.id;

   

    var productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = obj.preview;
    productImage.alt = obj.name + ' Pic';

    productLink.appendChild(productImage);

    var innerDiv = document.createElement('div');
    innerDiv.classList.add('product-meta');

    var productName = document.createElement('h4');
    var productNameText = document.createTextNode(obj.name);
    productName.appendChild(productNameText);

    var productBrand = document.createElement('h5');
    var productBrandText = document.createTextNode(obj.brand);
    productBrand.appendChild(productBrandText);

    var productPrice = document.createElement('p');
    var productPriceText = document.createTextNode('Rs ' + obj.price);
    productPrice.appendChild(productPriceText);

    innerDiv.append(productName,productBrand,productPrice);

    mainDiv.append(productLink,innerDiv);

    return mainDiv;
}

$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data, status) {
    var response = data;

    for (var i = 0; i < response.length; i++) {
        if (response[i].isAccessory) {
            $('#accessory-grid').append(createHomePageProductCard(response[i]))
        } else {
            $('#clothing-grid').append(createHomePageProductCard(response[i]))
        }
    }
})
// window.onload = function(){
//     const urlParams = new URLSearchParams(window.location.search);
//     const myParam = urlParam.get('productid');
//     console.log('param', myParam);
// }


const dom = (id) => document.getElementById(id)
const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('producid')

// lấy data theo myParam
const url = 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const detail = data.content 
        // hiển thị đối tượng khi buy now
        const detailRender = `<div class="row">
                                <div class="left">
                                    <div class="img">
                                        <img src="${detail.image}" alt="">
                                    </div>
                                </div>
                                <div class="right">
                                    <h1>${detail.name}</h1>
                                    <p>${detail.description}</p>
                                    <h3>Available size</h3>
                                    <div class="btnSize" id="size"></div>                    
                                    <h4>${detail.price}$</h4>
                                    <div class="btnUpDown">
                                        <button class="btnPlus">+</button>
                                        <span>1</span>
                                        <button class="btnPlus">-</button>
                                    </div>
                                    <div class="btnAdd">
                                        <button>Add to cart</button>
                                    </div>                    
                                </div>
                            </div>`
        dom('detail').innerHTML = detailRender

        const size = detail.size 
        const sizeRender = size.reduce((value, size, index) => {
            return value += `<button class="size${index + 1}">${size}</button>`
        }, '')
        dom('size').innerHTML = sizeRender
        
        const products = detail.relatedProducts 
        const productRender = products.reduce((value, product) => {
            return value += `<div class="col">
                                <div class="card">
                                <img src="${product.image}" alt="">
                                <h3>${product.name}</h3>
                                <p>${product.shortDescription}</p>
                                <a href="./detail.html?producid=${product.id}">Buy now</a>
                                <span>${product.price}$</span>
                                </div>
                            </div>`
        }, '')
        dom('products').innerHTML = productRender
    })
    .catch((err) => alert(err))
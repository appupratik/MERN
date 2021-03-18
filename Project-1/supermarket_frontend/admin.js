fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => {
        let productsString = "";
        products.forEach((product, index) => {
            productsString += `
            <tr>
                <td><span></span>${index + 1}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.type}</td>
                <td>${product.rating}</td>
                <td>
                    <button class="btn btn-success" onclick="getProduct(${product.id}, this)">Update</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id}, this)">Delete</button>
                </td>
            </tr>`;
        });
        document.getElementById("product_container").innerHTML = productsString;
    });

function getProduct(id, ele) {
    let childrens = ele.parentNode.parentNode.children;
    let title = childrens[1].innerText;
    let description = childrens[2].innerText;
    let price = childrens[3].innerText;
    let type = childrens[4].innerText;
    childrens[0].children[0].innerHTML = `<input type="hidden" id="id" value="${id}" readonly>`;
    childrens[1].innerHTML = `<input type="text" id="name" onkeyup="validateName()" value="${title}"><div id="nameError" class="error"></div>`;
    childrens[2].innerHTML = `<input type="text" id="description" onkeyup="validateDesc()" value="${description}"><div id="descError" class="error"></div>`;
    childrens[3].innerHTML = `<input type="text" id="price" onkeyup="validatePrice()" value="${price}"><div id="priceError" class="error"></div>`;
    childrens[4].innerHTML = `<input type="text" id="type" onkeyup="validateType()" value="${type}"><div id="typeError" class="error"></div>`;
    childrens[6].innerHTML = `<button class="btn btn-primary" onclick="updateProduct(this,${id})">Save Changes</button>`;
}

function updateProduct(button, id) {
    let product = {};
    product.title = button.parentNode.parentNode.children[1].children[0].value;
    product.description = button.parentNode.parentNode.children[2].children[0].value;
    product.price = button.parentNode.parentNode.children[3].children[0].value;
    product.type = button.parentNode.parentNode.children[4].children[0].value;

    fetch("http://localhost:3000/product?id=" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
        .then((response) => response.json())
        .then((product) => {
            let gChild = button.parentNode.parentNode.children;
            gChild[1].innerHTML = product.title;
            gChild[2].innerHTML = product.description;
            gChild[3].innerHTML = product.price;
            gChild[4].innerHTML = product.type;
            gChild[6].innerHTML = `<button class="btn btn-success" onclick="getProduct(${id}, this)">Update</button>
        <button class="btn btn-danger" onclick="deleteProduct(${id}, this)">Delete</button>`;
            document.getElementById("message").innerHTML = `<p class="alert alert-success">Product Updated Successfully!!!</p>`;
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteProduct(id, ele) {
    ele.parentNode.parentNode.style.display = "none";
    fetch("http://localhost:3000/product?id=" + id, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("message").innerHTML = `<p class="alert alert-success">${data.message}</p>`;
        });
}
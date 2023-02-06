var keranja = {
    list : null,
    iURL : "image/",

    init : () => {
        keranja.list = document.getElementById("productlist");
    
        keranja.list.innerHTML = "";
        let template = document.getElementById("telemp").content,
            p, item;
        for (let id in products) {
          p = products[id];
          item = template.cloneNode(true);
          item.querySelector(".p-image").src = keranja.iURL + p.img;
          item.querySelector(".p-name").textContent = p.name;
          item.querySelector(".p-price").textContent = "RP " + p.price + " /pcs";
          keranja.list.appendChild(item);
        }
    }
}

window.addEventListener("DOMContentLoaded", keranja.init);


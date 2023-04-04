var keranja = {
    hlist : null,
    hItems : null,
    items : {},
    iURL : "image/",

    load : () => {
        keranja.items = localStorage.getItem("keranja");
        if (keranja.items == null) { keranja.items = {}}
        else { keranja.items = JSON.parse(keranja.items)}
    },

    init : () => {
        keranja.hItems = document.getElementById("keranja-items");
        keranja.load();
        keranja.list();
    },

    list : () => {
        keranja.hItems.innerHTML = "";
        let item, empty = true;
        for (let key in keranja.items) {
          if (keranja.items.hasOwnProperty(key)) { empty = false; break; }
        }
    
        if (empty) {
          item = document.createElement("h1");
          item.innerHTML = "Cart is empty :(";
          item.className = "summa";
          item.id = "summa";
          keranja.hItems.appendChild(item);
        }
    
        else {
          let template = document.getElementById("template-keranja").content,
              p, total = 0, subtotal = 0;
          for (let id in keranja.items) {
            p = products[id];
            item = template.cloneNode(true);
            item.querySelector(".c-name").textContent = p.name;
            item.querySelector(".c-qty").value = keranja.items[id];
            item.querySelector(".subtotal").textContent = p.price * keranja.items[id];
            keranja.hItems.appendChild(item);

            subtotal = keranja.items[id] * p.price;
            total += subtotal;
          }
    

          item = document.createElement("div");
          item.className = "c-total";
          item.id = "c-total";
          item.innerHTML ="TOTAL : RP " + total;
          keranja.hItems.appendChild(item);
        }
      },
}

window.addEventListener("DOMContentLoaded", keranja.init);
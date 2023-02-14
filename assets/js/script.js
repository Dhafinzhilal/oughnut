var keranja = {
    hlist : null,
    hItems : null,
    items : {},
    iURL : "image/",

    save : () => {
        localStorage.setItem("keranja", JSON.stringify(keranja.items));
    },

    load : () => {
        keranja.items = localStorage.getItem("keranja");
        if (keranja.items == null) { keranja.items = {}}
        else { keranja.items = JSON.parse(keranja.items)}
    },

    nuke : () => {
        keranja.items = {};
        localStorage.removeItem("keranja");
        keranja.list();
    },

    
    init : () => {
        keranja.hlist = document.getElementById("productlist");
        keranja.hItems = document.getElementById("keranja-items");
    
        keranja.hlist.innerHTML = "";
        let template = document.getElementById("telemp").content,
            p, item;
        for (let id in products) {
          p = products[id];
          item = template.cloneNode(true);
          item.querySelector(".p-image").src = keranja.iURL + p.img;
          item.querySelector(".p-name").textContent = p.name;
          item.querySelector(".p-price").textContent = "RP " + p.price + " /pcs";
          item.querySelector(".p-add").onclick = () => {keranja.add(id)};
          keranja.hlist.appendChild(item);
        }
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
            item.querySelector(".c-del").onclick = () => {keranja.remove(id)};
            item.querySelector(".c-name").textContent = p.name;
            item.querySelector(".c-qty").value = keranja.items[id];
            item.querySelector(".c-qty").onchange = function () {keranja.change(id, this.value)};
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
    
      add : (id) => {
        if (keranja.items[id] == undefined) { keranja.items[id] = 1; }
        else {keranja.items[id]++; }
        keranja.save(); keranja.list();
      },
    
      change : (pid, qty) => {
        if (qty <= 0) {
          delete keranja.items[pid];
          keranja.save(); keranja.list();
        }
        else {
          keranja.items[pid] = qty;
          var total = 0;
          for (let id in keranja.items) {
            total += keranja.items[id] * products[id].price;
            document.getElementById("c-total").innerHTML ="TOTAL: RP " + total;
          }
        }
      },

      remove : (id) => {
        delete keranja.items[id];
        keranja.save();
        keranja.list();
      },

      checkout : () => {
        if (keranja.list == (null)){
          alert("There's no products in cart!")
        }
        
      }
}

window.addEventListener("DOMContentLoaded", keranja.init);
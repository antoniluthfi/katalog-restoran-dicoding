import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import NotFound from 'images/404.png';

const data = require("../DATA.json");

// example of loading data
const loadingData = () => {
    let html = `
        <div class="loading">
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>
            <div class="obj-loading"></div>            
        </div>
    `;

    document.getElementById("card-wrapper").innerHTML = html;
};

// restaurant data handler
const restaurantsMapHandler = (list = data) => {
    loadingData();

    let html = "";
    setTimeout(function() {
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                html += `
                    <div class="card">
                        <div class="card-container">
                            <div class="card-bit-info">
                                <h4 class="city">${list[i].city}</h4>
                                <h4 class="rating">${list[i].rating} Bintang</h4>
                            </div>
                            <img class="card-image" src="${list[i].pictureId}" alt="${list[i].name}" />
                        </div>
    
                        <div class="card-details">
                            <div class="restaurant-name">
                                <h3>${list[i].name}</h3>
                            </div>
    
                            <div class="restaurant-description">
                                <p>${list[i].description.length > 150 ? `${list[i].description.substring(0, 150)}...` : list[i].description}</p>
                            </div>
    
                            <div class="restaurant-more-description">
                                <button class="read-more" id="${list[i].id}" title="Baca Lebih Lengkap">Baca lebih lengkap</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            html += `
                <div class="not-found-wrapper">
                    <img src="${NotFound}" alt="not found" class="not-found-img" width="100%" />
                </div>
            `;
        }

        document.getElementById("card-wrapper").innerHTML = html;

        // open modal
        const readMoreDetailsBtn = document.getElementsByClassName("read-more");
        const dismissPopup = document.getElementById("dismiss-popup");
        const popupModal = document.getElementsByClassName("popup")[0];

        for (let i = 0; i < readMoreDetailsBtn.length; i++) {
            readMoreDetailsBtn[i].addEventListener("click", function(e) {
                const detailData = data.restaurants.filter((detail) => detail.id === e.target.attributes.id.value)[0];

                document.getElementsByClassName("popup-title")[0].innerHTML = `<h1>${detailData.name}</h1>`;
                document.getElementsByClassName("popup-image")[0].innerHTML = `<img src="${detailData.pictureId}" alt="${detailData.name}" width="100%" />`;
                document.getElementsByClassName("popup-description")[0].innerHTML = `<h3>${detailData.description}</h3>`;

                document.querySelector("body").style.overflow = 'hidden';
                document.getElementsByClassName("container")[0].classList.add('container-blur');
                popupModal.classList.add("active");
            });                
        }

        // close modal
        dismissPopup.addEventListener("click", function() {
            document.querySelector("body").style.overflow = 'visible';
            popupModal.classList.remove("active");
            document.getElementsByClassName("container")[0].classList.remove('container-blur');
        });
    }, 1000);
};

// load for the first time
window.onload = function () {
    restaurantsMapHandler(data.restaurants);
};

// app drawer handler
document.getElementById("icon").addEventListener("click", function () {
    const navUl = document.getElementById("nav-ul");
    const show = document.getElementsByClassName("show");
    const hide = document.getElementsByClassName("hide");

    if (show.length > 0) {
        navUl.classList.remove("show");
        navUl.classList.add("hide");
    } else if (hide.length > 0) {
        navUl.classList.remove("hide");
        navUl.classList.add("show");
    }
});

// on scroll handler
// scroll to top
const scrollToTopBtn = document.getElementById("go-to-top");
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
        scrollToTopBtn.style.backgroundColor = "red";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// scroll button selengkapnya
const btnSelengkapnya = document.getElementById("selengkapnya");
btnSelengkapnya.addEventListener("click", function () {
    const topPos = document
        .getElementById("cari-restoran")
        .getBoundingClientRect().top;
    window.scrollTo(0, topPos - 100);
});

// input cari restoran
let filteredData = data.restaurants;
const inputCariRestoran = document.getElementById("input-cari-restoran");
inputCariRestoran.addEventListener("keyup", function (e) {
    filteredData = data.restaurants.filter(
        (item) =>
            item.name.toLowerCase().includes(inputCariRestoran.value.toLowerCase()) ||
            item.city.toLowerCase().includes(inputCariRestoran.value.toLowerCase())
    );

    restaurantsMapHandler(filteredData);
});

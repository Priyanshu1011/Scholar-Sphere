
function reveal() {
    var reveals = document.querySelectorAll(".reveal", ".left-to-right");
    // console.log(reveals);
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight; // Ht of viewport
        var elementTop = reveals[i].getBoundingClientRect().top; // Distance of element from top of viewport
        var elementVisible = 50; // Ht at which element should be revealed
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("activeLR");
        }
        // else {
        //     reveals[i].classList.remove("activeLR");
        // }
    }
    var rightToLeft = document.querySelectorAll(".reveal", ".right-to-left");
    // console.log(rightToLeft);
    for (var i = 0; i < rightToLeft.length; i++) {
        var windowHeight = window.innerHeight; // Ht of viewport
        var elementTop = rightToLeft[i].getBoundingClientRect().top; // Distance of element from top of viewport
        var elementVisible = 150; // Ht at which element should be revealed
        if (elementTop < windowHeight - elementVisible) {
            rightToLeft[i].classList.add("activeRL");
        }
        // else {
        //     rightToLeft[i].classList.remove("activeRL");
        // }
    }
}

// TYPEWRITER GRADCAL
var i = 0, j = 0;
var txt = 'Welcome to Grade Calculators!';
var txt2 = 'Get your grades calculated with ease. All in one place!';
var speed = 80;

function typeWriter() {
    if (j < txt2.length) {
        document.getElementById("gradcal-hero-title").textContent += txt.charAt(i);
        document.getElementById("gradcal-caption").textContent += txt2.charAt(j);
        i++; j++;
        setTimeout(typeWriter, speed);
    }
}

// TYPEWRITER QP
var m = 0, n = 0;
var qp_txt = 'Welcome to Question Papers!';
var qp_txt2 = 'Get all previous year question papers to ace your exams!';
var speed = 80;

function typeWriterQP() {
    if (n < qp_txt2.length) {
        document.getElementById("qp-hero-title").textContent += qp_txt.charAt(m);
        document.getElementById("qp-caption").textContent += qp_txt2.charAt(n);
        m++; n++;
        setTimeout(typeWriterQP, speed);
    }
}

// TYPEWRITER NOTES
var a = 0, b = 0;
var notes_txt = 'Welcome to Notes!';
var notes_txt2 = 'Get all the notes for any course you need.';
var speed = 80;

function typeWriterNotes() {
    if (b < notes_txt2.length) {
        document.getElementById("notes-hero-title").textContent += notes_txt.charAt(a);
        document.getElementById("notes-caption").textContent += notes_txt2.charAt(b);
        a++; b++;
        setTimeout(typeWriterNotes, speed);
    }
}



document.addEventListener("scroll", reveal);

// To check the scroll position on page load
// reveal();

// ------------------------------------------------
let popup = document.getElementById("pop-up");

function openPopup(clicked_id) {
    // console.log("openPopup:" + clicked_id);
    var str = "calc-" + clicked_id + "-popup";
    let info = document.getElementById(str);
    popup.classList.add("open-popup", clicked_id);
    // console.log(popup.classList);
    // setTimeout(function(){}, 3000);
    info.classList.remove("hidden");
    info.classList.add("visible");
}

function closePopup() {
    popup.classList.remove("open-popup");
    var str = "calc-" + popup.classList[1] + "-popup";
    // console.log("closePopup:" + str);
    let info = document.getElementById(str);
    info.classList.remove("visible");
    info.classList.add("hidden");
    popup.classList.remove(popup.classList[1]);

}

// -----------------------------------------------------------------------
// NAVBAR FUNCTIONALITY

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 100) {
        document.getElementById("navbar").style.padding = "0.01% 0.01% 0.01% 0.01%";
        document.getElementById("logo").style.fontSize = "0";
    }
    else {
        document.getElementById("navbar").style.padding = "0.6% 0 0.6% 0";
        // document.getElementById("logo-img").style.paddingBottom = "1.8% 0 2% 0";
        document.getElementById("logo-img").style.translate = "0 -6%";
        document.getElementById("logo-img").style.height = "80px";
        // document.getElementById("navbar").style.padding = "10px 10px";
        // document.getElementById("logo").style.fontSize = "35px";
    }
}

// ---------------------------------------------
// NOTES PAGE JS

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


// -----------------------------------------
// HOME PAGE JS

var myDate = new Date();
var hrs = myDate.getHours();
var greet;

if (hrs < 12)
    greet = 'Good Morning!🌞';
else if (hrs >= 12 && hrs < 17)
    greet = 'Good Afternoon!🌇';
else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening!🌃';

document.getElementById('greetings').innerHTML = '<b>' + greet + '</b>';

// -----------------------------------------
// LOADER JS

// var loader;
// function loadNow(opacity) {
//     if (opacity <= 0) {
//         displayContent();
//     } else {
//         loader.style.opacity = opacity;
//         window.setTimeout(function () {
//             loadNow(opacity - 0.5);
//         }, 1000);
//     }
// }
function displayContent() {
    loader = document.getElementById("loader");
    loader.style.display = "none";
    // document.getElementById("content").style.display = "block";
}
// document.addEventListener("DOMContentLoaded", function () {
//     loader = document.getElementById("loader");
//     loadNow(1);
// });


// -------------------------------
// HOME PAGE

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function SlideHandler() {
    setInterval(function () {
        plusSlides(1);
    }, 7000);
}

// window.onload = SlideHandler()
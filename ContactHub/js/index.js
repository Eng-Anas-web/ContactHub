let menuBtnSlider = document.getElementById("menuSlider");
var toggles = document.querySelectorAll(".switch input");
let btnShowSlide = document.querySelector(".show-slide");
let btnClosedSideHidden = document.getElementById("closed-side");
let sliderRight = document.querySelector("aside");
let changeColor = Array.from(
  document.querySelectorAll(".circle-btn-color .hover-t"),
);

var btnResetSetting = document.getElementById("resetSetting");

let menuBtns = document.querySelectorAll(".menu-btns button");

let cards = document.querySelectorAll(".cards-menu")

let cardCustomer = Array.from(document.querySelectorAll(".card-customer"))

let nextBtn = document.querySelector(".next-btn")



menuBtnSlider.addEventListener("click", function () {
  let slider = document.querySelector(".slider-navber");
  slider.classList.toggle("active");
  menuBtnSlider.classList.toggle("fa-xmark");
  menuBtnSlider.classList.toggle("fa-bars");
});

function btnDarkAndLight() {
  document.documentElement.classList.toggle("light");

  var isLight = document.documentElement.classList.contains("light");

  // تحديث كل الأزرار
  toggles.forEach(function (input) {
    input.checked = isLight;
  });

  // حفظ الحالة
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// لما المستخدم يضغط
toggles.forEach(function (input) {
  input.addEventListener("change", btnDarkAndLight);
});

// عند تحميل الصفحة
var savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.documentElement.classList.add("light");

  toggles.forEach(function (input) {
    input.checked = true;
  });
}

btnShowSlide.addEventListener("click", function () {
  sliderRight.classList.toggle("active-side");
});

function closeSidbar() {
  sliderRight.classList.remove("active-side");
}

btnClosedSideHidden.addEventListener("click", closeSidbar);

document.addEventListener("click", function (e) {
  if (!sliderRight.contains(e.target)) {
    closeSidbar();
  }
});

let cardsFont = document.querySelectorAll(".cards-sidber div");
for (let i = 0; i < cardsFont.length; i++) {
  cardsFont[i].addEventListener("click", function () {
    for (let j = 0; j < cardsFont.length; j++) {
      cardsFont[j].classList.remove("active-sidebar");
    }
    cardsFont[i].classList.add("active-sidebar");
    let srcFont = cardsFont[i].getAttribute("data-font");
    document.body.style.fontFamily = srcFont;
    localStorage.setItem(
      "fontSetting",
      JSON.stringify({
        font: srcFont,
        activeCard: srcFont,
      }),
    );
  });
}

let saveCard = localStorage.getItem("fontSetting");

//حفظ نوع الخط
if (saveCard) {
  saveCard = JSON.parse(saveCard);
  document.body.style.fontFamily = saveCard.font;
}
//حفظ الاكتف تبع الكارد
if (saveCard) {
  for (let i = 0; i < cardsFont.length; i++) {
    if (cardsFont[i].getAttribute("data-font") == saveCard.activeCard) {
      cardsFont[i].classList.add("active-sidebar");
    } else {
      cardsFont[i].classList.remove("active-sidebar");
    }
  }
}

for (let i = 0; i < changeColor.length; i++) {
  changeColor[i].addEventListener("click", function () {
    for (let j = 0; j < changeColor.length; j++) {
      changeColor[j].classList.remove("active-color");
    }
    changeColor[i].classList.add("active-color");

    // نجيب الكلاس اللي في data-color ونطبقه على body
    let colorClass = this.getAttribute("data-color");

    // إزالة كل كلاس الألوان القديمة قبل إضافة الجديد
    document.documentElement.classList.remove(
      "mainColor",
      "colorRed",
      "tealGreen",
      "skyBlue",
      "crimsonRed",
      "orangeA",
    );

    // إضافة الكلاس الجديد
    document.documentElement.classList.add(colorClass);

    localStorage.setItem("saveColor", colorClass);
  });
}

let saveCardColorPage = localStorage.getItem("saveColor");

if (saveCardColorPage) {
  document.documentElement.classList.add(saveCardColorPage);
  for (let i = 0; i < changeColor.length; i++) {
    if (changeColor[i].getAttribute("data-color") === saveCardColorPage) {
      changeColor[i].classList.add("active-color");
    } else {
      changeColor[i].classList.remove("active-color");
    }
  }
}

btnResetSetting.addEventListener("click", function () {
  for (let i = 0; i < changeColor.length; i++) {
    changeColor[i].classList.remove("active-color");
    changeColor[0].classList.add("active-color");
    document.documentElement.classList.remove(
      "colorRed",
      "tealGreen",
      "skyBlue",
      "crimsonRed",
      "orangeA",
    );
  }
  for (let j = 0; j < cardsFont.length; j++) {
    cardsFont[j].classList.remove("active-sidebar");
    cardsFont[1].classList.add("active-sidebar");
    document.body.style.fontFamily = "Tajawal, sans-serif";
  }

  localStorage.removeItem("fontSetting");
  localStorage.removeItem("saveColor");
});

let sections = document.querySelectorAll("section[id]");
let links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let middle = window.scrollY + window.innerHeight / 2;
  let currentId = "";

  sections.forEach((section) => {
    let top = section.offsetTop;
    let bottom = top + section.offsetHeight;

    if (middle >= top && middle <= bottom) {
      currentId = section.id;
    }
  });

  if (!currentId) return;

  links.forEach((link) => {
    link.classList.remove("active", "active-nav");
  });

  document
    .querySelectorAll(`.nav-link[href="#${currentId}"]`)
    .forEach((link) => {
      link.classList.add("active", "active-nav");
    });
});



for(let i =0 ; i < menuBtns.length ; i++){
    menuBtns[i].addEventListener("click" , function(e){
      if(e.target.tagName == "BUTTON")
      for(var j =0 ; j <menuBtns.length ; j++){
         menuBtns[j].classList.remove("active-menu-btn")
      }
               menuBtns[i].classList.add("active-menu-btn")

    })
}

for(let i = 0; i < menuBtns.length; i++){
  menuBtns[i].addEventListener("click", function(){
    let filter = this.dataset.filter;

    for(let j = 0; j < cards.length; j++){
      let card = cards[j];

      if(filter === "all" || card.dataset.category === filter){
        card.classList.remove("hide");
        card.classList.remove("d-none"); // رجعه يظهر
      } else {
        card.classList.add("hide");      // fade out
        setTimeout(() => {
          card.classList.add("d-none");  // بعد الانيميشن يختفي من layout
        }, 300); // نفس مدة transition
      }
    }
  });
}



let sendDataBtn = document.getElementById("sendDataa")
let fullNameInput = document.getElementById("fullName");
let emailInput = document.getElementById("email");
let numberInput = document.getElementById("number");
let typeProjectInput = document.getElementById("typeProject");
let monyPrpjectInput = document.getElementById("monyPrpject");
let datilesInput = document.getElementById("datiles");

function clearInputs(){
  fullNameInput.value = null;
  emailInput.value = null;
  numberInput.value = null;
  typeProjectInput.value = null;
  monyPrpjectInput.value = null;
  datilesInput.value = null;
}

let form = document.querySelector("form")
form.addEventListener("submit" , function(e){
  e.preventDefault();
})

sendDataBtn.addEventListener("click" , function(){

if(validationInputs(fullNameInput ,'msgName' ) && validationInputs(emailInput ,'msgEmail' )&&validationInputs(numberInput , 'msgnumber') &&validationInputs(typeProjectInput , 'msgType')&&
validationInputs(monyPrpjectInput , 'msgMzanyha' )&& validationInputs(datilesInput , 'msgDesc')){
Swal.fire({
  title: "تم إرسال رسالتك بنجاح!",
  text: "شكراً لتواصلك...",
  icon: "success",
  didOpen: (popup) => {
    popup.style.position = "relative";
    popup.style.margin = "auto";
    popup.style.left = "0";
    popup.style.right = "0";
  }
});
clearInputs();
}
})




fullNameInput.addEventListener("input" ,function(){
  validationInputs(this , 'msgName')
} )
emailInput.addEventListener("input" , function(){
  validationInputs(this , 'msgEmail')
})
numberInput.addEventListener("input" ,function(){
  validationInputs(this , 'msgnumber')
} )
typeProjectInput.addEventListener("input" ,function(){
  validationInputs(this , 'msgType')
} )
monyPrpjectInput.addEventListener("input" , function(){
  validationInputs(this , 'msgMzanyha')
} )
datilesInput.addEventListener("input" ,function(){
  validationInputs(this , 'msgDesc')
} )




function validationInputs( element , msgText){


  let regax = {
     fullName : /^[a-zA-Z\u0600-\u06FF ]{5,20}$/i,
     email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
     number :  /^(010|011|012|015)\d{8}$/,
     typeProject : /^(|webstie|webApp|applaction|design|consultation)$/i,
     monyPrpject :  /^(les 20,000|20,000 50,0000|50,000 100,000| more 100,0000)$/i,
     datiles : /^[a-zA-Z\u0600-\u06FF0-9 ,.-]{5,35}$/ 
  }
let text = element.value;
let msgInput = document.getElementById(msgText);
if(regax[element.id].test(text)){
  msgInput.classList.add("d-none")
  return true;
}else{
  msgInput.classList.remove("d-none")
  return false;
}
}

let Dasbord = document.getElementById("Dasbord");
let choosePhotoInput = document.getElementById("choosePhoto");
let fullNameInput = document.getElementById("fullName");
let phoneNumber = document.getElementById("phoneNumber");
let emailInput = document.getElementById("email");
let addressInput = document.getElementById("address");
let selectInput = document.getElementById("select");
let descripitionInput = document.getElementById("descripition");
let checkFavoriteInput = document.getElementById("checkFavorite");
let checkEmergencyInput = document.getElementById("checkEmergency");
let indexContact = document.getElementById("indexContact");
let indexContactb = document.getElementById("indexContactb");
let indexFavorites = document.getElementById("indexFavorites");
let indexEmergency = document.getElementById("indexEmergency");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");

currentIndex = 0;

function ShowDasbord() {
  Dasbord.classList.add("d-block");
}
function hiddenDasbord() {
  Dasbord.classList.remove("d-block");
  clearInput();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}
let contactList = [];

if (localStorage.getItem("containerContact")) {
  contactList = JSON.parse(localStorage.getItem("containerContact"));
  displayContact();
}

function addContact() {
  if (
    validationInputs(choosePhotoInput, "msgImg") &&
    validationInputs(fullNameInput, "msgName") &&
    validationInputs(phoneNumber, "msgNumber") &&
    validationInputs(emailInput, "msgEmail") &&
    validationInputs(addressInput, "msgAddress") &&
    validationInputs(selectInput, "msgSelect") &&
    validationInputs(descripitionInput, "msgNotes")
  ) {
    Swal.fire({
      title: "Do you want to save?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let contact = {
          image: choosePhotoInput.files[0]
            ? `images/${choosePhotoInput.files[0]?.name}`
            : "images/avatar-2.jpg",
          name: fullNameInput.value.trim(),
          number: phoneNumber.value.trim(),
          email: emailInput.value.trim(),
          address: addressInput.value.trim(),
          select: selectInput.value.trim(),
          descripition: descripitionInput.value.trim(),
          favorite: checkFavoriteInput.checked,
          emergency: checkEmergencyInput.checked,
        };

        contactList.push(contact);

        localStorage.setItem("containerContact", JSON.stringify(contactList));
        clearInput();
        displayContact();
        Swal.fire("Saved!", "", "success");
        hiddenDasbord();
      } else if (result.isDenied) {
        Swal.fire("Not Saved", "", "info");
      }
    });
  }
}

function clearInput() {
  choosePhotoInput.files = null;
  fullNameInput.value = null;
  phoneNumber.value = null;
  emailInput.value = null;
  addressInput.value = null;
  selectInput.value = null;
  descripitionInput.value = null;
  checkFavoriteInput.checked = null;
  checkEmergencyInput.checked = null;

  choosePhotoInput.classList.remove("is-valid");
  fullNameInput.classList.remove("is-valid");
  phoneNumber.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  addressInput.classList.remove("is-valid");
  selectInput.classList.remove("is-valid");
  descripitionInput.classList.remove("is-valid");
}

function delteContacts(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("containerContact", JSON.stringify(contactList));
      displayContact();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function displayContact() {
  var fevSum = 0;
  var emrSum = 0;
  var fevBox = "";
  var emrBox = "";
  let cartoona = "";

  for (var i = 0; i < contactList.length; i++) {
    cartoona += creatCols(i);

    if (contactList[i].favorite) {
      fevSum++;
      fevBox += `
                      <div
                    class="d-flex align-items-center justify-content-between rounded-4 bg-rosas p-2 mb-2"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <div
                        class="nav-header-4 nav-header-3 d-flex align-items-center justify-content-center"
                      >
                       <img src="${contactList[i].image}" alt="${contactList[i].name}" style="height:40px; width:40px;" class="rounded-4">
                      </div>
                      <div>
                        <p class="m-0">${contactList[i].name}</p>
                        <p class="text-secondary">${contactList[i].number}</p>
                      </div>
                    </div>
                    <div class="bg-success-subtle p-1 rounded-3 cousor">
                      <a href="tel:${contactList[i].number}">
                      <i class="fa-solid fa-phone text-success"></i>
                      </a>
                    </div>
                  </div>`;
    }
    if (contactList[i].emergency) {
      emrSum++;
      emrBox += `                  <div
                    class="d-flex align-items-center justify-content-between rounded-4 bg-rosas p-2 mb-2"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <div
                        class="nav-header-4 nav-header-3 d-flex align-items-center justify-content-center"
                      >
                        <img src="${contactList[i].image}" alt="${contactList[i].name}" style="height:40px; width:40px;" class="rounded-4">
                      </div>
                      <div>
                        <p class="m-0">${contactList[i].name}</p>
                        <p class="text-secondary">${contactList[i].number}</p>
                      </div>
                    </div>
                    <div class="bg-success-subtle p-1 rounded-3 cousor">
                      <a href="tel:${contactList[i].number}">
                      <i class="fa-solid fa-phone text-success"></i>
                      </a>
                    </div>
                  </div>`;
    }
  }

  document.getElementById("rowData").innerHTML = cartoona;
  indexContact.innerHTML = contactList.length;
  indexContactb.innerHTML = contactList.length;
  indexFavorites.innerHTML = fevSum;
  indexEmergency.innerHTML = emrSum;

  updateUIStates(fevSum, emrSum, fevBox, emrBox);
}

function search() {
  let term = document.getElementById("searchContact").value;
  let cartoona = "";
  let found = false;
  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(term.toLowerCase()) ||
      contactList[i].number.toLowerCase().includes(term.toLowerCase()) ||
      contactList[i].email.toLowerCase().includes(term.toLowerCase())
    ) {
      found = true;
      cartoona += creatCols(i);
    }
  }
  if (!found) {
    cartoona = `<div class="col-12 text-center">

                <div
                  class="d-flex align-items-center justify-content-center mx-auto bg-rsase"
                >
                  <i
                    class="fa-solid fa-address-book fa-2xl"
                    style="color: #d1d5dc"
                  ></i>
                </div>
                <h5 class="text-secondary fw-bold">No contacts found</h5>
                <p class="text-secondary fw-bold">
                  Click "Add Contact" to get started
                </p>
              </div>`;
  }
  document.getElementById("rowData").innerHTML = cartoona;
}

function creatCols(i) {
  return ` <div class="col-xl-6">
                <div class="contact-card">
                  <!-- Header -->
                  <div class="d-flex align-items-center mb-3">
                    <div class="avatar me-3">
                      <img style="height:55px ; width:55px;" class="rounded-4" src="${contactList[i].image}" alt="${contactList[i].name}">
                      <div class="badge-top ${contactList[i].favorite ? "" : "d-none"}">
                        <i class="fa-solid fa-star"></i>
                      </div>
                      <div class="badge-bottom ${contactList[i].emergency ? "" : "d-none"}">
                        <i class="fa-solid fa-heart-pulse"></i>
                      </div>
                    </div>

                    <div>
                      <h6 class="mb-1 fw-bold">${contactList[i].name}</h6>
                      <div class="d-flex align-items-center text-muted small">
                        <div class="info-icon bg-primary text-white me-2">
                          <i class="fa-solid fa-phone"></i>
                        </div>
                        ${contactList[i].number}
                      </div>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="d-flex align-items-center text-muted mb-2 small">
                    <div
                      class="info-icon me-2 text-white"
                      style="background: #7b1fa2"
                    >
                      <i class="fa-solid fa-envelope"></i>
                    </div>
                    ${contactList[i].email}
                  </div>

                  <!-- Location -->
                  <div class="d-flex align-items-center text-muted mb-3 small">
                    <div class="info-icon me-2 text-white bg-success">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    ${contactList[i].address}
                  </div>

                  <div class="d-flex align-items-center gap-2">
  <!-- Nots -->
  <div class="mb-3  bg-success text-white d-flex align-items-center justify-content-center rounded-3" 
       style="width: 25px; height: 25px;">
    <i class="fa-solid fa-align-left"></i>
  </div>
  <div>
    <p class="text-muted small m-0">${contactList[i].descripition}</p><br>
  </div>
</div>

                  <!-- Tags -->
                  <div class="mb-3">
                    <span class="tag bg-success-subtle text-success me-2"
                      >${contactList[i].select}</span
                    >
                    <span class="tag bg-danger-subtle text-danger ${contactList[i].emergency ? "" : "d-none"}" id="emergencyChecked">
                      <i class="fa-solid fa-heart-pulse me-1"></i> Emergency
                    </span>
                  </div>

                  <!-- Actions -->
                  <div
                    class="actions text-muted d-flex align-content-center justify-content-evenly"
                  >
                    <a href="tel:${contactList[i].number}">
                    <i class="fa-solid fa-phone text-success"></i>
                    </a>
                    <a href="mailto:${contactList[i].email}">
                    <i class="fa-solid fa-envelope" style="color: #7b1fa2"></i>
                    </a>
                    <i onclick="toggleFev(${i})" class="fa-regular fa-star text-secondry ${contactList[i].favorite ? "text-warning fa-solid" : ""}"></i>
                    <i onclick="toggleEmr(${i})" class="fa-regular fa-heart text-secondry ${contactList[i].emergency ? "text-danger fa-solid fa-heart-pulse " : ""}"></i>
                    <i onclick="updateInfoContact(${i})" class="fa-solid fa-pen text-primary"></i>
                    <i onclick="delteContacts(${i})" class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>`;
}

function updateUIStates(fevSum, emrSum, fevBox, emrBox) {
  // حالة مفيش contacts خالص
  if (contactList.length === 0) {
    rowData.innerHTML = `
      <div class="col-12 text-center">
        <div class="d-flex align-items-center justify-content-center mx-auto bg-rsase">
          <i class="fa-solid fa-address-book fa-2xl" style="color: #d1d5dc"></i>
        </div>
        <h5 class="text-secondary fw-bold">No contacts found</h5>
        <p class="text-secondary fw-bold">
          Click "Add Contact" to get started
        </p>
      </div>`;
  }

  // حالة favorites
  if (fevSum === 0) {
    rowFavirte.innerHTML = `
      <p class="text-secondary fw-bold text-center py-4">
        No favorites yet
      </p>`;
  } else {
    rowFavirte.innerHTML = fevBox;
  }

  // حالة emergency
  if (emrSum === 0) {
    rowemargency.innerHTML = `
      <p class="text-secondary fw-bold text-center py-4">
        No emergency contacts
      </p>`;
  } else {
    rowemargency.innerHTML = emrBox;
  }

  // تحديث العدادات لو تحب
  indexFavorites.innerHTML = fevSum;
  indexEmergency.innerHTML = emrSum;
}

window.onload = function () {
  if (contactList.length > 0) {
    displayContact(); // هتنشئ الكروت وتملأ الـ favorites والـ emergency
  } else {
    updateUIStates(0, 0, "", ""); // حالة مفيش بيانات أصلاً
  }
};

function toggleFev(index) {
  contactList[index].favorite = !contactList[index].favorite;
  displayContact();
  localStorage.setItem("containerContact", JSON.stringify(contactList));
}

function toggleEmr(index) {
  contactList[index].emergency = !contactList[index].emergency;
  displayContact();
  localStorage.setItem("containerContact", JSON.stringify(contactList));
}

function updateInfoContact(index) {
  currentIndex = index;
  ShowDasbord();
  fullNameInput.value = contactList[index].name;
  phoneNumber.value = contactList[index].number;
  emailInput.value = contactList[index].email;
  addressInput.value = contactList[index].address;
  selectInput.value = contactList[index].select;
  descripitionInput.value = contactList[index].descripition;
  checkFavoriteInput.checked = contactList[index].favorite;
  checkEmergencyInput.checked = contactList[index].emergency;

  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function updateContact(currentIndex) {
  if (
    validationInputs(choosePhotoInput, "msgImg") &&
    validationInputs(fullNameInput, "msgName") &&
    validationInputs(phoneNumber, "msgNumber") &&
    validationInputs(emailInput, "msgEmail") &&
    validationInputs(addressInput, "msgAddress") &&
    validationInputs(selectInput, "msgSelect") &&
    validationInputs(descripitionInput, "msgNotes")
  ) {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let contact = {
          image: choosePhotoInput.files[0]
            ? `images/${choosePhotoInput.files[0]?.name}`
            : "images/1.jpg",
          name: fullNameInput.value.trim(),
          number: phoneNumber.value.trim(),
          email: emailInput.value.trim(),
          address: addressInput.value.trim(),
          select: selectInput.value.trim(),
          descripition: descripitionInput.value.trim(),
          favorite: checkFavoriteInput.checked,
          emergency: checkEmergencyInput.checked,
        };
        contactList.splice(currentIndex, 1, contact);
        localStorage.setItem("containerContact", JSON.stringify(contactList));
        clearInput();
        displayContact();
        Swal.fire("Saved!", "", "success");
        updateBtn.classList.add("d-none");
        addBtn.classList.remove("d-none");
        hiddenDasbord();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}

function validationInputs(element, msgText) {
  let regex = {
    choosePhoto: /(\.(jpg|jpeg|png|gif))?$/i, // اختياري مع امتدادات الصور
    fullName: /^[a-zA-Z\u0600-\u06FF ]{5,20}$/i, // اسم بالكامل عربي أو انجليزي + مسافة
    phoneNumber: /^(010|011|012|015)\d{8}$/, // أرقام الهاتف ثابتة
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // الايميل زي ما هو
    address: /^[a-zA-Z\u0600-\u06FF0-9 ,.-]{5,30}$/, // العنوان يسمح بالعربي، انجليزي، أرقام، فراغ، فاصلة، نقطة، شرطة
    select: /^(Family|Friends|Work|School|Other)$/i, // اختيار من القائمة، case-insensitive
    descripition: /^[a-zA-Z\u0600-\u06FF0-9 ,.-]{5,35}$/, // الوصف يسمح بالعربي، انجليزي، أرقام، فراغ، فاصلة، نقطة، شرطة
  };
  var text = element.value;
  var msgInputs = document.getElementById(msgText);
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msgInputs.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msgInputs.classList.remove("d-none");
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".content-text");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Aktif butonu güncelle
            document.querySelector(".tab-btn.active").classList.remove("active");
            this.classList.add("active");

            // İçerikleri güncelle
            contents.forEach(content => content.classList.remove("active"));
            document.getElementById(this.getAttribute("data-target")).classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-btnn");
    const contents = document.querySelectorAll(".content-textt");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Aktif butonu güncelle
            document.querySelector(".tab-btnn.active").classList.remove("active");
            this.classList.add("active");

            // İçerikleri güncelle
            contents.forEach(content => content.classList.remove("active"));
            document.getElementById(this.getAttribute("data-target")).classList.add("active");
        });
    });
});

document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');

    if (link.href === window.location.href) {
        link.classList.add('active');
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const toggleCheckbox = document.querySelector(".toggle-checkbox");
    const passwordField = document.getElementById("passwordField");

    // Sayfa yüklendiğinde varsayılan olarak gizle
    passwordField.style.display = "none";

    toggleCheckbox.addEventListener("change", function () {
        if (this.checked) {
            passwordField.style.display = "block";
        } else {
            passwordField.style.display = "none";
        }
    });
});
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
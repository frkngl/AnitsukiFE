document.addEventListener("DOMContentLoaded", function () {
    function setupTabs(buttonClass, contentClass) {
        const buttons = document.querySelectorAll(`.${buttonClass}`);
        const contents = document.querySelectorAll(`.${contentClass}`);

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const activeBtn = document.querySelector(`.${buttonClass}.active`);
                if (activeBtn) activeBtn.classList.remove("active");
                this.classList.add("active");

                contents.forEach(content => content.classList.remove("active"));
                const targetId = this.getAttribute("data-target");
                document.getElementById(targetId)?.classList.add("active");
            });
        });
    }

    setupTabs("tab-btn", "content-text");
    setupTabs("tab-btnn", "content-textt");
    setupTabs("tab-btnnn", "content-texttt");
});

document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');

    if (link.href === window.location.href) {
        link.classList.add('active');
    }
})
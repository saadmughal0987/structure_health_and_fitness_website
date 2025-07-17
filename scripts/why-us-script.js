const menuBtn = document.getElementById('menuToggle');
const header = document.getElementById('header');
let toggle = false;

function closeMenu() {
    toggle = !toggle;
    const nav = document.getElementById("navbar");
    nav.classList.remove('active');
    menuBtn.textContent = "☰ Menu";
    menuBtn.style.color = "white";
    header.style.setProperty("background-color", "#33333357", "important");
}

function toggleMenu() {
    toggle = !toggle;
    const nav = document.getElementById("navbar");
    nav.classList.toggle("active");

    if (toggle) {
        menuBtn.textContent = "☰ Close";
        menuBtn.style.color = "#ffD200";
        header.style.setProperty("background-color", "#333333", "important");
    } else {
        menuBtn.textContent = "☰ Menu";
        menuBtn.style.color = "white";
        header.style.setProperty("background-color", "#33333357", "important");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const branchButtons = document.querySelectorAll('.branch-button');

    branchButtons.forEach(button => {
        button.addEventListener('click', function () {

            const branchId = this.getAttribute('data-branch');


            branchButtons.forEach(btn => {
                btn.classList.remove('active');
            });


            this.classList.add('active');


            document.querySelectorAll('.branch-schedule').forEach(schedule => {
                schedule.classList.remove('active');
            });


            document.getElementById(`${branchId}-schedule`).classList.add('active');
        });
    });
});

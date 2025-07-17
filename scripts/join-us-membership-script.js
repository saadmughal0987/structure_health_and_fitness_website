document.getElementById("commitSlider").addEventListener("input", function () {
    document.getElementById("commitValue").textContent = this.value;
});


document
    .querySelector(".form-section")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        document.querySelectorAll(".error-msg").forEach((el) => el.remove());

        let valid = true;

        const showError = (element, message) => {
            const error = document.createElement("p");
            error.className = "error-msg";
            error.style.color = "red";
            error.style.margin = "5px 0 0";
            error.style.fontSize = "14px";
            error.innerText = message;
            element.insertAdjacentElement("afterend", error);
            valid = false;
        };

        const name = document.getElementById("name");
        if (name.value.trim() === "") showError(name, "Name is required");

        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") showError(email, "Email is required");
        else if (!emailRegex.test(email.value.trim()))
            showError(email, "Enter a valid email");

        const gender = document.getElementById("gender");
        if (gender.value === "Select Gender")
            showError(gender, "Please select your gender");

        const phone = document.getElementById("phone");
        if (phone.value.trim() === "")
            showError(phone, "Phone number is required");
        else if (phone.value.trim().length < 10)
            showError(phone, "Phone number too short");

        const weight = document.querySelector("[name='weight']");
        if (weight.value.trim() === "")
            showError(weight, "Enter your weight");
        else if (isNaN(weight.value.trim()) || weight.value.trim() <= 0)
            showError(weight, "Invalid weight");

        const heightFeet = document.querySelector("[name='heightFeet']");
        if (heightFeet.value.trim() === "")
            showError(heightFeet, "Enter height in feet");
        else if (
            isNaN(heightFeet.value.trim()) ||
            heightFeet.value.trim() <= 0
        )
            showError(heightFeet, "Invalid height");

        const heightInches = document.querySelector("[name='heightInches']");
        if (heightInches.value.trim() === "")
            showError(heightInches, "Enter inches");
        else if (
            isNaN(heightInches.value.trim()) ||
            heightInches.value.trim() < 0
        )
            showError(heightInches, "Invalid inches");

        // If everything is valid, submit
        if (valid) {
            alert("Form submitted successfully!");
            this.submit();
        }
    });


const weightInput = document.getElementById("weight");
const feetInput = document.getElementById("feet");
const inchInput = document.getElementById("inches");
const bmiField = document.getElementById("bmi-value");
const categoryField = document.getElementById("bmi-category");

let chart;

function updateChart(bmi, category) {
    const categories = ["Underweight", "Normal weight", "Overweight", "Obesity"];
    const values = categories.map(cat => cat === category ? bmi : 0);

    chart.data.datasets[0].data = values;
    chart.update();
}

function autoCalculateBMI() {
    const weight = parseFloat(weightInput.value);
    const feet = parseFloat(feetInput.value);
    const inches = parseFloat(inchInput.value);

    if (isNaN(weight) || isNaN(feet) || isNaN(inches)) return;

    const totalInches = (feet * 12) + inches;
    const heightMeters = totalInches * 0.0254;
    const bmi = weight / (heightMeters * heightMeters);
    const bmiRounded = bmi.toFixed(2);
    bmiField.value = bmiRounded;

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obesity";

    categoryField.value = category;

    updateChart(parseFloat(bmiRounded), category);
}

[weightInput, feetInput, inchInput].forEach(input => {
    input.addEventListener("input", autoCalculateBMI);
});

window.onload = function () {
    const ctx = document.getElementById("bmiChart").getContext("2d");
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Underweight", "Normal weight", "Overweight", "Obesity"],
            datasets: [{
                label: 'BMI Value',
                data: [0, 0, 0, 0],
                backgroundColor: ['#00BFFF', '#32CD32', '#FFA500', '#FF4500'],
                borderColor: '#222',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#000' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                    ticks: { color: '#000' },
                    grid: { color: '#ddd' }
                },
                x: {
                    ticks: { color: '#000' },
                    grid: { color: '#ddd' }
                }
            }
        }
    });
};
const menuBtn = document.getElementById('menuToggle');
const header = document.getElementById('header');
let toggle = false;

function closeMenu() {
    toggle = !toggle;
    const nav = document.getElementById("navbar");
    nav.classList.remove('active');
    menuBtn.textContent = "☰ Menu";
    menuBtn.style.color = "white";
}

function toggleMenu() {
    toggle = !toggle;
    const nav = document.getElementById("navbar");
    nav.classList.toggle("active");

    if (toggle) {
        menuBtn.textContent = "☰ Close";
        menuBtn.style.color = "#ffD200";
    } else {
        menuBtn.textContent = "☰ Menu";
        menuBtn.style.color = "white";
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
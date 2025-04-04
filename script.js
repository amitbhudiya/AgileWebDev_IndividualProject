const currentPage = window.location.pathname.split("/").pop(); // Get the current page name
const navLinks = document.querySelectorAll(".nav-link"); // Select all navigation links

navLinks.forEach((link) => {

    if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("activepage"); // Add active class to the current page link
    }
});

// Function to handle the "summary" section
let totalhtmlselected = 0;
let totalcssselected = 0;
let totaljavascriptselected = 0;
let totalhtml = 0;
let totalcss = 0;
let totaljs = 0;
function selected() {
    // Reset counters before counting
    totalhtmlselected = 0
    totalhtml = 0
    totalcssselected = 0
    totalcss = 0
    totaljavascriptselected = 0
    totaljs = 0

    // Count HTML checkboxes
    const htmlinput = document.getElementsByName("html-checkbox")
    for (let index = 0; index < htmlinput.length; index++) {
        totalhtml += 1
        if (htmlinput[index].checked) {
            totalhtmlselected += 1
        }
    }
    document.querySelector(".html-count").innerHTML = totalhtmlselected + " / " + totalhtml

    // Count CSS checkboxes
    const cssinput = document.getElementsByName("css-checkbox")
    for (let index = 0; index < cssinput.length; index++) {
        totalcss += 1
        if (cssinput[index].checked) {
            totalcssselected += 1
        }
    }
    document.querySelector(".css-count").innerHTML = totalcssselected + " / " + totalcss

    // Count JavaScript checkboxes
    const jsinput = document.getElementsByName("js-checkbox")
    for (let index = 0; index < jsinput.length; index++) {
        totaljs += 1
        if (jsinput[index].checked) {
            totaljavascriptselected += 1
        }
    }
    document.querySelector(".js-count").innerHTML = totaljavascriptselected + " / " + totaljs

    // Calculate total progress
    const total = totalhtml + totalcss + totaljs
    const selected = totalhtmlselected + totalcssselected + totaljavascriptselected
    const progress = Math.round((selected / total) * 100)

    // Update progress bar color based on progress
    if (progress >= 50) {
        document.querySelector(".progress-bar").style.color = "#ffffff"
    } else {
        document.querySelector(".progress-bar").style.color = "#000000"
    }

    // Update progress text
    if (selected > 0) {
        document.querySelector(".track").innerHTML =
            "You've implemented " + selected + " out of " + total + " best practices."
    } else {
        document.querySelector(".track").innerHTML =
            "Track your progress toward implementing web development best practices."
    }

    // Check if success criteria is met
    if (selected >= total - 2) {
        document.querySelector(".success-criteria").innerHTML =
            "Excellent! Your code follows industry-standard best practices."
        catimageajax()
        congratulations()
        document.querySelector(".summary-bottom").style.display = "block"
    } else {
        document.querySelector(".success-criteria").innerHTML =
            "Implement at least " + (total - 2) + " practices to meet the successful criteria."
        document.querySelector(".summary-bottom").style.display = "none"
    }

    // Update progress bar
    document.querySelector(".progress-bar").style.backgroundSize = progress + "%"
    document.querySelector(".progress-bar").innerHTML = progress + "%"
}

// Function to fetch a random cat image from The Cat API
// and display it in the reward image section
function catimageajax() {
    $('#loader').show(); // Show the loader
    $('.rewardimage').hide(); // Hide the image initially
    $.ajax({
        url: 'https://api.thecatapi.com/v1/images/search', // API endpoint for random cat image
        method: 'GET',
        success: function (data) {
            if (data && data.length > 0) {
                const catImageUrl = data[0].url; // Get the cat image URL from the response
                $('.rewardimage').attr('src', catImageUrl);
                $('.rewardimage').on('load', function () {
                    $('#loader').hide();
                    $('.rewardimage').fadeIn(300);
                });
            }
        },
        error: function (error) {
            console.error("Error fetching cat image:", error); // Log any errors
            $('#loader').hide();
        }
    });
}


// Function to set a cookie with a specified name, value, and expiration days
function setCookie(cookieName, cookieValue, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";" + expires + ";path=/";
}

// Function to get the value of a cookie by its name
function getCookie(cookieName) {
    let nameEQ = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArr = decodedCookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        let c = cookieArr[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// Save all checkbox states to a single cookie as a JSON array
function saveCheckboxesToCookie() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let states = [];
    checkboxes.forEach((checkbox, index) => {
        states[index] = checkbox.checked ? 1 : 0;
    });
    setCookie("checkboxStates", JSON.stringify(states), 1); // store for 1 days
}

// Load checkbox states from the cookie and apply them
function loadCheckboxesFromCookie() {
    let jsonStates = getCookie("checkboxStates");
    if (jsonStates) {
        let states = JSON.parse(jsonStates);
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = (states[index] === 1);
        });
    }
}

// Function to create and launch confetti animation
function congratulations() {
    const confettiContainer = document.getElementById("confetti-container");
    launchConfetti();
    /**
     * Creates multiple confetti pieces.
     * Feel free to adjust the number, colors, speed, etc.
     */
    function launchConfetti() {
        const confettiCount = 40; // number of pieces
        for (let i = 0; i < confettiCount; i++) {
            createConfettiPiece();
        }
    }
    /**
     * Creates a single confetti piece with random properties.
     */
    function createConfettiPiece() {
        const confetti = document.createElement("span");
        confetti.classList.add("confetti");

        // Random horizontal position (0% to 100%)
        confetti.style.left = Math.random() * 100 + "%";

        // Random color
        const colors = ["#ff0", "#0ff", "#0f0", "#f0f", "#00f", "#f00", "#fff", "#000"];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Optional: random delay so they don't all fall at once
        const randomDelay = Math.random() * 1; // up to 1 second
        confetti.style.animationDelay = `${randomDelay}s`;

        // Optional: random additional rotation
        const randomAngle = Math.floor(Math.random() * 360);
        confetti.style.transform = `rotate(${randomAngle}deg)`;

        // Remove the confetti from DOM when animation ends
        confetti.addEventListener("animationend", () => {
            confetti.remove();
        });

        // Append confetti piece to container
        confettiContainer.appendChild(confetti);
    }
}


// On page load, load cookie data, then set up listeners
document.addEventListener("DOMContentLoaded", () => {
    // Load any previously saved checkbox states
    loadCheckboxesFromCookie();

    // If you have a "selected()" function to update your summary, call it
    selected();

    // Whenever any checkbox changes, save to cookie (and optionally re-calc)
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            saveCheckboxesToCookie();
            selected();
        });
    });
});

// Function to introduce the element fade-in effect
// This function uses Intersection Observer API to detect when elements are in view
document.addEventListener("DOMContentLoaded", () => {
    // Grab all the elements that should fade in
    const fadeElements = document.querySelectorAll(".fade-element");
    const fadeElementsheader = document.querySelectorAll(".fade-element-header");
    const fadeElementsp = document.querySelectorAll(".fade-element-p");

    const observerOptions = {
        root: null,      // use the browser viewport as the container
        rootMargin: "0px",
        threshold: 0.1   // trigger when 10% of the element is visible
    };

    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class when the element is in view
                entry.target.classList.add("visible");
                // Optionally unobserve the element after it’s visible once
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(fadeInOnScroll, observerOptions);
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    fadeElementsheader.forEach(element => {
        observer.observe(element);
    });
    fadeElementsp.forEach(element => {
        observer.observe(element);
    });
});


// Initially show the first tab content
$("#about").addClass("active")

// Tab switching functionality
$(".cv-tabs-link").on("click", function (e) {
    e.preventDefault()

    // Remove active class from all tabs and content
    $(".cv-tabs-link").removeClass("active")
    $(".tab-content").removeClass("active")

    // Add active class to clicked tab
    $(this).addClass("active")

    // Get the target content id from data attribute
    const targetId = $(this).attr("data-bs-target")

    // Show the corresponding content
    $(targetId).addClass("active")

    // Optional: Add animation
    $(targetId).hide().fadeIn(300)
})





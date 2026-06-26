const API_URL = "https://script.google.com/macros/s/AKfycby349SmyJvbfKyAigrsUGX796oNAvP6a6uwMgI007ot6ea7f8FiDptmyfEcvsJj2zs8/exec";

async function loadDashboard() {

    const response = await fetch(API_URL);
    const data = await response.json();

    let sugar = 0;
    let milk = 0;
    let rice = 0;

    // Skip the header row
    for (let i = 1; i < data.length; i++) {

        if (data[i][1] === "Yes") sugar++;
        if (data[i][2] === "Yes") milk++;
        if (data[i][3] === "Yes") rice++;

    }
const latest = data[data.length - 1];

document.getElementById("todaySugar").textContent =
latest[1] === "Yes" ? "✅ Yes" : "❌ No";

document.getElementById("todayMilk").textContent =
latest[2] === "Yes" ? "✅ Yes" : "❌ No";

document.getElementById("todayRice").textContent =
latest[3] === "Yes" ? "✅ Yes" : "❌ No";
    document.getElementById("sugarDays").textContent = sugar;
    document.getElementById("milkDays").textContent = milk;
    document.getElementById("riceDays").textContent = rice;
    let sugarStreak = 0;
let milkStreak = 0;
let riceStreak = 0;

// Sugar streak
for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][1] === "No") {
        sugarStreak++;
    } else {
        break;
    }
}

// Milk streak
for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][2] === "No") {
        milkStreak++;
    } else {
        break;
    }
}

// Rice streak
for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][3] === "No") {
        riceStreak++;
    } else {
        break;
    }
}

document.getElementById("sugarStreak").textContent = sugarStreak;
document.getElementById("milkStreak").textContent = milkStreak;
document.getElementById("riceStreak").textContent = riceStreak;
}

loadDashboard();
const API_URL = "https://script.google.com/macros/s/AKfycby349SmyJvbfKyAigrsUGX796oNAvP6a6uwMgI007ot6ea7f8FiDptmyfEcvsJj2zs8/exec";

async function loadDashboard() {

    const response = await fetch(API_URL);
    const data = await response.json();

    let sugarDays = 0;
    let milkDays = 0;
    let riceDays = 0;

    const labels = [];
    const sugarData = [];
    const milkData = [];
    const riceData = [];

    // Count totals + Prepare chart data
    for (let i = 1; i < data.length; i++) {

        const date = new Date(data[i][0]);

        labels.push(
            date.toLocaleDateString("en-CA", {
                month: "short",
                day: "numeric"
            })
        );

        if (data[i][1] === "Yes") sugarDays++;
        if (data[i][2] === "Yes") milkDays++;
        if (data[i][3] === "Yes") riceDays++;

        sugarData.push(data[i][1] === "Yes" ? 1 : 0);
        milkData.push(data[i][2] === "Yes" ? 1 : 0);
        riceData.push(data[i][3] === "Yes" ? 1 : 0);
    }

    // Today's Status
    const latest = data[data.length - 1];

    document.getElementById("todaySugar").textContent =
        latest[1] === "Yes" ? "✅ Yes" : "❌ No";

    document.getElementById("todayMilk").textContent =
        latest[2] === "Yes" ? "✅ Yes" : "❌ No";

    document.getElementById("todayRice").textContent =
        latest[3] === "Yes" ? "✅ Yes" : "❌ No";

    // Total Days
  const totalEntries = data.length - 1;

const sugarPercent = Math.round((sugarDays / totalEntries) * 100);
const milkPercent = Math.round((milkDays / totalEntries) * 100);
const ricePercent = Math.round((riceDays / totalEntries) * 100);

document.getElementById("sugarDays").textContent = sugarDays + " Days";
document.getElementById("milkDays").textContent = milkDays + " Days";
document.getElementById("riceDays").textContent = riceDays + " Days";

document.getElementById("sugarPercent").textContent = sugarPercent + "%";
document.getElementById("milkPercent").textContent = milkPercent + "%";
document.getElementById("ricePercent").textContent = ricePercent + "%";

document.getElementById("sugarProgress").style.width = sugarPercent + "%";
document.getElementById("milkProgress").style.width = milkPercent + "%";
document.getElementById("riceProgress").style.width = ricePercent + "%";

    // Streaks
    let sugarStreak = 0;
    let milkStreak = 0;
    let riceStreak = 0;

    for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][1] === "No") sugarStreak++;
        else break;
    }

    for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][2] === "No") milkStreak++;
        else break;
    }

    for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][3] === "No") riceStreak++;
        else break;
    }

  document.getElementById("sugarStreak").textContent = sugarStreak;
document.getElementById("milkStreak").textContent = milkStreak;
document.getElementById("riceStreak").textContent = riceStreak;


// ======================
// Weekly Summary
// ======================

const lastWeek = data.slice(Math.max(1, data.length - 7));

const weekSugar = lastWeek.filter(row => row[1] === "Yes").length;
const weekMilk = lastWeek.filter(row => row[2] === "Yes").length;
const weekRice = lastWeek.filter(row => row[3] === "Yes").length;

document.getElementById("weekSugar").textContent =
`${weekSugar} / ${lastWeek.length}`;

document.getElementById("weekMilk").textContent =
`${weekMilk} / ${lastWeek.length}`;

document.getElementById("weekRice").textContent =
`${weekRice} / ${lastWeek.length}`;


// ======================
// Monthly Summary
// ======================

const lastMonth = data.slice(Math.max(1, data.length - 30));

const monthSugar = lastMonth.filter(row => row[1] === "Yes").length;
const monthMilk = lastMonth.filter(row => row[2] === "Yes").length;
const monthRice = lastMonth.filter(row => row[3] === "Yes").length;

document.getElementById("monthSugar").textContent =
`${monthSugar} / ${lastMonth.length}`;

document.getElementById("monthMilk").textContent =
`${monthMilk} / ${lastMonth.length}`;

document.getElementById("monthRice").textContent =
`${monthRice} / ${lastMonth.length}`;


// ======================
// Chart
// ======================

new Chart(document.getElementById("intakeChart"), {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "Sugar",
                    data: sugarData,
                    borderColor: "#e74c3c",
                    backgroundColor: "#e74c3c",
                    borderWidth: 3,

                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointBorderWidth: 2,
                    pointBorderColor: "#ffffff",
                    pointBackgroundColor: "#e74c3c",

                    tension: 0.35,
                    fill: false
                },

                {
                    label: "Milk",
                    data: milkData,
                    borderColor: "#3498db",
                    backgroundColor: "#3498db",
                    borderWidth: 3,

                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointBorderWidth: 2,
                    pointBorderColor: "#ffffff",
                    pointBackgroundColor: "#3498db",

                    tension: 0.35,
                    fill: false
                },

                {
                    label: "Rice",
                    data: riceData,
                    borderColor: "#2ecc71",
                    backgroundColor: "#2ecc71",
                    borderWidth: 3,

                    pointRadius: 6,
                    pointHoverRadius: 9,
                    pointBorderWidth: 2,
                    pointBorderColor: "#ffffff",
                    pointBackgroundColor: "#2ecc71",

                    tension: 0.35,
                    fill: false
                }

            ]

        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {

                legend: {

                    position: "top",

                    labels: {

                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 20,

                        font: {
                            size: 14,
                            weight: "bold"
                        }

                    }

                },

                tooltip: {

                    callbacks: {

                        label: function (context) {

                            return context.dataset.label + ": " +
                                (context.raw === 1 ? "Yes" : "No");

                        }

                    }

                }

            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8
                    }

                },

                y: {

                    min: 0,
                    max: 1,

                    ticks: {

                        stepSize: 1,

                        callback: function (value) {

                            return value === 1 ? "Yes" : "No";

                        }

                    }

                }

            }

        }

    });
    
}

loadDashboard();
if("serviceWorker" in navigator){

    navigator.serviceWorker.register("service-worker.js");

}
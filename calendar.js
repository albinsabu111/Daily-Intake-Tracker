const API_URL = "https://script.google.com/macros/s/AKfycby349SmyJvbfKyAigrsUGX796oNAvP6a6uwMgI007ot6ea7f8FiDptmyfEcvsJj2zs8/exec";

async function loadCalendar(){

    const response = await fetch(API_URL);
    const data = await response.json();

    const calendar = document.getElementById("calendar");

    calendar.innerHTML = "";

    for(let i = 1; i < data.length; i++){

        const row = data[i];

        const date = new Date(row[0]);

        const box = document.createElement("div");

        box.className = "calendar-day";

        box.innerHTML = `
            <strong>${date.getDate()}</strong>
        `;

        if(row[1] === "No"){

            box.classList.add("good-day");

        }else{

            box.classList.add("bad-day");

        }

        calendar.appendChild(box);

    }

}

loadCalendar();
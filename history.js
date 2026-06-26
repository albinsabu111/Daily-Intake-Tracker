const API_URL = "https://script.google.com/macros/s/AKfycby349SmyJvbfKyAigrsUGX796oNAvP6a6uwMgI007ot6ea7f8FiDptmyfEcvsJj2zs8/exec";

async function loadHistory(){

    const response = await fetch(API_URL);

    const data = await response.json();

    let html = "";

    for(let i=data.length-1;i>=1;i--){

        const date = new Date(data[i][0]);

        html += `
        <tr>

            <td>${date.toLocaleDateString("en-CA",{
                month:"short",
                day:"numeric",
                year:"numeric"
            })}</td>

            <td>${data[i][1]=="Yes"?"✅ Yes":"❌ No"}</td>

            <td>${data[i][2]=="Yes"?"✅ Yes":"❌ No"}</td>

            <td>${data[i][3]=="Yes"?"✅ Yes":"❌ No"}</td>

        </tr>
        `;

    }

    document.getElementById("historyTable").innerHTML = html;

}

loadHistory();
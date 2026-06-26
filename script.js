const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby349SmyJvbfKyAigrsUGX796oNAvP6a6uwMgI007ot6ea7f8FiDptmyfEcvsJj2zs8/exec";

// Show today's date
const today = new Date();

document.getElementById("today").innerHTML =
today.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Handle YES / NO button selection
document.querySelectorAll(".choice").forEach(button => {

    button.addEventListener("click", () => {

        const question = button.dataset.question;
        const value = button.dataset.value;

        // Remove selection from both buttons
        document
            .querySelectorAll(`[data-question="${question}"]`)
            .forEach(btn => {

                btn.classList.remove("selected","yes","no");

            });

        // Highlight selected button
        button.classList.add("selected");

        if(value === "Yes"){
            button.classList.add("yes");
        }else{
            button.classList.add("no");
        }

        // Save value
        document.getElementById(question).value = value;

    });

});

// Submit form
document.getElementById("intakeForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const sugar = document.getElementById("sugar").value;
    const milk = document.getElementById("milk").value;
    const rice = document.getElementById("rice").value;

    if(!sugar || !milk || !rice){

        alert("Please answer all questions.");

        return;

    }

    try{

        await fetch(SCRIPT_URL,{
            method:"POST",
            body:JSON.stringify({
                sugar,
                milk,
                rice
            })
        });

        alert("✅ Saved Successfully!");

        this.reset();

        document.querySelectorAll(".choice").forEach(btn=>{

            btn.classList.remove("selected","yes","no");

        });

    }

    catch(error){

        alert("Error saving data.");

        console.error(error);

    }

});
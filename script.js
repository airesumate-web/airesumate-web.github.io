const form = document.getElementById("resumeForm");
const resumeOutput = document.getElementById("resumeOutput");

const tickUpload = document.getElementById("tick-upload");
const tickAPI = document.getElementById("tick-api");
const tickResume = document.getElementById("tick-resume");

function updateTick(tickElement, success = true) {
  tickElement.textContent = success ? "✅" : "❌";
  tickElement.className = success ? "done" : "error";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userData = {};
  formData.forEach((value, key) => (userData[key] = value));

  // Step 1: Mark uploaded
  updateTick(tickUpload);

  try {
    // Step 2: GPT API call
    updateTick(tickAPI, false); // while pending

    const res = await fetch("https://airesumate-web-github-io.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (data.resume) {
      updateTick(tickAPI, true);
      updateTick(tickResume, true);
      resumeOutput.textContent = data.resume;
    } else {
      updateTick(tickResume, false);
      resumeOutput.textContent = "Error generating resume.";
    }
  } catch (err) {
    console.error(err);
    updateTick(tickAPI, false);
    updateTick(tickResume, false);
    resumeOutput.textContent = "Error contacting server.";
  }
});

const tickUpload = document.getElementById("tick-upload");
const tickAPI = document.getElementById("tick-api");
const tickResume = document.getElementById("tick-resume");
const tickDownload = document.getElementById("tick-download");
const resumeOutput = document.getElementById("resumeOutput");

function updateTick(el, success = true) {
  el.textContent = success ? "✅" : "❌";
  el.className = success ? "done" : "error";
}

// Periodically check backend
async function pollStatus() {
  try {
    const res = await fetch("https://airesumate-web-github-io.onrender.com/status");
    const data = await res.json();

    const steps = data.steps || [];

    // Set ticks based on completed steps
    if (steps.includes("uploaded")) updateTick(tickUpload);
    if (steps.includes("gpt-called")) updateTick(tickAPI);
    if (steps.includes("resume-generated")) {
      updateTick(tickResume);
      if (data.resume) resumeOutput.textContent = data.resume;
    }

    if (steps.includes("downloaded")) {
      updateTick(tickDownload);
    }

    // Stop polling if complete
    if (steps.includes("done")) clearInterval(polling);
  } catch (e) {
    console.error("Error fetching status:", e);
    resumeOutput.textContent = "⚠️ Server error or connection issue.";
  }
}

// Start polling every 3 seconds
const polling = setInterval(pollStatus, 3000);

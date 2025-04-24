const API_URL = "https://airesumate-web-github-io.onrender.com/status";

function updateStatus(id, message, statusClass) {
  const step = document.getElementById(id);
  step.innerText = message;
  step.className = statusClass;
}

async function fetchStatus() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    updateStatus('step1', data.userDataUploaded ? '✔️ User data uploaded' : '❌ User data missing', data.userDataUploaded ? 'success' : 'fail');
    updateStatus('step2', data.gptApiIntegrated ? '✔️ GPT API integrated' : '❌ GPT API not integrated', data.gptApiIntegrated ? 'success' : 'fail');

    if (data.generationProgress < 100) {
      updateStatus('step3', `⏳ Resume generation: ${data.generationProgress}%`, 'pending');
    } else {
      updateStatus('step3', '✔️ Resume generation complete', 'success');
    }

    updateStatus('step4', data.resumeGenerated ? '✔️ Resume generated' : '❌ Resume not generated', data.resumeGenerated ? 'success' : 'fail');
    updateStatus('step5', data.resumeDownloaded ? '✔️ Resume downloaded' : '❌ Resume not downloaded', data.resumeDownloaded ? 'success' : 'fail');

  } catch (error) {
    updateStatus('step1', '❌ Failed to connect to API', 'fail');
    updateStatus('step2', '❌ Failed to connect to API', 'fail');
    updateStatus('step3', '❌ Failed to connect to API', 'fail');
    updateStatus('step4', '❌ Failed to connect to API', 'fail');
    updateStatus('step5', '❌ Failed to connect to API', 'fail');
    console.error("API error:", error);
  }
}

function goHome() {
  window.location.href = "index.html"; // Or change if you have a different home page
}

// Auto-refresh every 3 seconds
window.onload = () => {
  fetchStatus();
  setInterval(fetchStatus, 3000);
};

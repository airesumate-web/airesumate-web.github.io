window.onload = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jsonData = decodeURIComponent(urlParams.get('data'));

    const parsedData = JSON.parse(jsonData);

    try {
        const response = await fetch("https://airesumate-backend.onrender.com/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: `Generate a professional ATS-friendly resume for the following data:\n${JSON.stringify(parsedData, null, 2)}`
            })
        });

        const result = await response.json();
        const resumeText = result.resume; // Assuming the backend returns the resume in a `resume` field

        // Create downloadable file
        const blob = new Blob([resumeText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "ATS-Friendly-Resume.txt";
        a.click();

        // Redirect back to Flutter app
        setTimeout(() => {
            window.location.href = "resumeapp://home"; // Custom URL scheme to navigate back
        }, 3000);
    } catch (error) {
        alert("Something went wrong. Try again.");
        console.error(error);
    }
};

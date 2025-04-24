function formatSection(title, data) {
  if (!data) return `${title}:\nNot Provided\n`;

  if (Array.isArray(data)) {
    return `${title}:\n` + data.map((item, index) => `  ${index + 1}. ${formatObject(item)}`).join("\n") + "\n";
  } else if (typeof data === 'object') {
    return `${title}:\n${formatObject(data)}\n`;
  } else {
    return `${title}:\n${data}\n`;
  }
}

function formatObject(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join("\n");
}

function getResumeDataFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("resume")) {
    try {
      const decoded = decodeURIComponent(params.get("resume"));
      const resumeObj = JSON.parse(decoded);

      return `
Name: ${resumeObj.name || "Not Provided"}

${formatSection("Career Objective", resumeObj.careerObjective)}
${formatSection("Education", resumeObj.education)}
${formatSection("Technical Skills", resumeObj.technicalSkills)}
${formatSection("Projects", resumeObj.projects)}
${formatSection("Internships", resumeObj.internships)}
${formatSection("Work Experience", resumeObj.workExperience)}
${formatSection("Certifications", resumeObj.certifications)}
${formatSection("Awards & Achievements", resumeObj.awards)}
${formatSection("Languages Known", resumeObj.languages)}
${formatSection("Hobbies & Interests", resumeObj.hobbies)}
${formatSection("Photo & Signature", resumeObj.photoSignature)}
`;
    } catch (e) {
      console.error("Invalid resume data in URL", e);
    }
  }
  return null;
}

window.onload = function () {
  const formattedResume = getResumeDataFromQuery();
  const outputElement = document.getElementById("resumeOutput");

  if (formattedResume) {
    outputElement.textContent = formattedResume;
  } else {
    outputElement.textContent = "No valid resume data found.";
  }
};

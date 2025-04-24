function getResumeDataFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("resume")) {
    try {
      const decoded = decodeURIComponent(params.get("resume"));
      const resumeObj = JSON.parse(decoded);

      return `
Name: ${resumeObj.name}

Career Objective:
${resumeObj.careerObjective}

Education:
${resumeObj.education}

Technical Skills:
${resumeObj.technicalSkills}

Projects:
${resumeObj.projects}

Internships:
${resumeObj.internships}

Work Experience:
${resumeObj.workExperience}

Certifications:
${resumeObj.certifications}

Awards & Achievements:
${resumeObj.awards}

Languages Known:
${resumeObj.languages}

Hobbies & Interests:
${resumeObj.hobbies}

Photo & Signature:
${resumeObj.photoSignature}
`;
    } catch (e) {
      console.error("Invalid resume data in URL", e);
    }
  }
  return null;
}

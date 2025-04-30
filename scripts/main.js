// Fetch introduction from GitHub
document.addEventListener("DOMContentLoaded", () => {
  const githubIntro = document.getElementById("github-intro");

  fetch("https://api.github.com/users/vedantsaxena")
    .then(response => response.json())
    .then(data => {
      if (data.bio) {
        githubIntro.textContent = data.bio;
      } else {
        githubIntro.textContent = "Hey there! I'm Vedant Saxena, a curious coder and AI/ML enthusiast passionate about creating practical and impactful software solutions. From building machine learning models for healthcare to developing AI-powered code security tools, digital personal assistants, network utilities, and data structures & algorithms (DSA) in C++ — I love experimenting with new technologies and turning ideas into reality. 💻 Check out my repositories for projects on AI/ML, full-stack web development, and personal tools. Always open to learning, collaboration, and open-source contributions!";
      }
    })
    .catch(error => {
      console.error("Error fetching GitHub data:", error);
      githubIntro.textContent = "Failed to load introduction.";
    });
});

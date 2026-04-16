// Select elements
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("search");


// 🔹 Load jobs from API
const noJobs = document.getElementById("noJobs");
function loadJobs() {
  fetch("http://localhost:3000/jobs")
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
  noJobs.style.display = "block";
} else {
  noJobs.style.display = "none";
}
      jobList.innerHTML = "";

      data.forEach(job => {
        const jobItem = document.createElement("div");

        jobItem.innerHTML = `
          <h3>${job.title}</h3>
          <p>📍 ${job.location}</p>
          <p>💰 KES ${job.pay}</p>
          <p>📞 ${job.phone}</p>
          <hr>
        `;

        jobList.appendChild(jobItem);
      });
    });
}

// Load jobs when page opens
loadJobs();


// 🔹 Handle form submission (POST)
jobForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const pay = document.getElementById("pay").value;
  const phone = document.getElementById("phone").value;

  fetch("http://localhost:3000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, location, pay, phone })
  })
  .then(() => {
    loadJobs();       // reload jobs from API
    jobForm.reset();  // clear form
  });
});


// 🔹 Search functionality
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function() {
  const searchValue = searchInput.value.toLowerCase();
  const jobs = document.querySelectorAll("#jobList div");

  let found = false;

  jobs.forEach(function(job) {
    const text = job.textContent.toLowerCase();

    if (text.includes(searchValue)) {
      job.style.display = "block";
      found = true;
    } else {
      job.style.display = "none";
    }
  });

  if (!found) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
});
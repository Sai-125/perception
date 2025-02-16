const link_btn = document.getElementById("link_btn");
const side_social = document.getElementById("side_social");
const menu = document.querySelector(".bx-menu");
const links = document.querySelector(".links");

link_btn.addEventListener("click", () => {
  side_social.classList.toggle("social_open");
});

menu.addEventListener("click", () => {
  links.classList.toggle("unhide");
});

// skills animation

document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.getElementById("Skills");
  const skills = [
    { element: document.querySelectorAll(".skill")[0], value: 75 },
    { element: document.querySelectorAll(".skill")[1], value: 85 },
    { element: document.querySelectorAll(".skill")[2], value: 90 },
  ];

  function animateSkills() {
    skills.forEach((skill) => {
      const number = skill.element.querySelector(".number");
      const progressCircle = skill.element.querySelector(".progress");
      const radius = progressCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      progressCircle.style.strokeDashoffset = `${circumference}`;

      function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        number.textContent = `${percent}%`;
      }

      let progressValue = 0;
      const targetValue = skill.value;

      const interval = setInterval(() => {
        if (progressValue < targetValue) {
          progressValue++;
          setProgress(progressValue);
        } else {
          clearInterval(interval);
        }
      }, 20);
    });
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(skillsSection);
});

// countdoen section

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const section = document.getElementById("countSection");
  let started = false; // To ensure the animation runs only once

  const countUp = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const speed = 200; // change animation speed here
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const isVisible = (elem) => {
    const { top, bottom } = elem.getBoundingClientRect();
    const vHeight = window.innerHeight || document.documentElement.clientHeight;
    return (top > 0 || bottom > 0) && top < vHeight;
  };

  const onScroll = () => {
    if (!started && isVisible(section)) {
      countUp();
      started = true;
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Run on load in case the section is already visible
});

// scroll active all

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Adjust the threshold to 0.5 for 50% visibility
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        navLinks.forEach((link) => link.classList.remove("active"));
        navLink.classList.add("active");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Ensure the first section's link is active by default
  const setActiveByDefault = () => {
    const firstSection = sections[0];
    const firstNavLink = document.querySelector(
      `a[href="#${firstSection.id}"]`
    );
    navLinks.forEach((link) => link.classList.remove("active"));
    firstNavLink.classList.add("active");
  };

  // Set the first section's link as active by default on page load
  setActiveByDefault();
});

// scroll name animation

// document.addEventListener('DOMContentLoaded', function () {
//   const sections = document.querySelectorAll('section');
//   const pTag = document.getElementById('active-section');
//   let initialLoad = true;

//   function updateActiveSection() {
//       let activeSectionFound = false;

//       sections.forEach(section => {
//           const rect = section.getBoundingClientRect();
//           if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
//               pTag.innerText = section.id;
//               activeSectionFound = true;
//           }
//       });

//       if (!activeSectionFound && initialLoad) {
//           pTag.innerText = 'home';
//       }

//       initialLoad = false;
//   }

//   document.addEventListener('scroll', updateActiveSection);

//   // Initial check when the page loads
//   updateActiveSection();
// });

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const pTag = document.getElementById("active-section");
  let initialLoad = true;
  let previousSection = "home";

  function updateActiveSection() {
    let activeSectionFound = false;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        if (section.id) {
          pTag.innerText = section.id;
          previousSection = section.id;
        }
        activeSectionFound = true;
      }
    });

    if (!activeSectionFound && initialLoad) {
      pTag.innerText = "home";
    } else if (!activeSectionFound) {
      pTag.innerText = previousSection;
    }

    initialLoad = false;
  }

  document.addEventListener("scroll", updateActiveSection);

  // Initial check when the page loads
  updateActiveSection();
});

AOS.init({
  delay: 200,
  duration: 1000,
  once: false,
});

const exploreProjects = document.querySelector(".feau_exp_pro");
const viewProjectsExplore = () => {
  exploreProjects.style.display = "block";
};

const feaImageOne = document.querySelector(".feaImageOne");
const feaVideoOne = document.querySelector(".feaVideoOne");
const feau_txt_one = document.querySelector(".feau_txt_one");

const viewVideo = () => {
  feaImageOne.style.display = "none";
  feaVideoOne.style.display = "block";
  feau_txt_one.style.display = "none";
};

// Wait for page load
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    splash.style.display = "none"; 
    mainContent.classList.remove("hidden");
    displayMeals();
    renderWeeklySchedule();
    updateClock();
    setInterval(updateClock, 1000);
  }, 3000); // 3 seconds splash
});

// Sample meals (replace with your real hostel chart)
const meals = {
  today: [
    { time: "08:00", name: "Breakfast - Idli & Sambar" },
    { time: "13:00", name: "Lunch - Rice, Curry, Fish Fry" },
    { time: "17:00", name: "Tea & Snacks" },
    { time: "20:00", name: "Dinner - Chapathi & Chicken Curry" }
  ],
  tomorrow: [
    { time: "08:00", name: "Breakfast - Dosa & Chutney" },
    { time: "13:00", name: "Lunch - Rice, Veg Curry, Egg Curry" },
    { time: "17:00", name: "Tea & Biscuit" },
    { time: "20:00", name: "Dinner - Rice & Sambar" }
  ],
  weekly: {
    Monday: ["Breakfast - Poori", "Lunch - Rice & Fish", "Dinner - Chapathi"],
    Tuesday: ["Breakfast - Dosa", "Lunch - Veg Meals", "Dinner - Fried Rice"],
    Wednesday: ["Breakfast - Upma", "Lunch - Biriyani", "Dinner - Idli"],
    Thursday: ["Breakfast - Appam", "Lunch - Rice & Chicken", "Dinner - Noodles"],
    Friday: ["Breakfast - Parotta", "Lunch - Veg Curry", "Dinner - Dosa"],
    Saturday: ["Breakfast - Idiyappam", "Lunch - Rice & Egg", "Dinner - Chapathi"],
    Sunday: ["Breakfast - Dosa", "Lunch - Fish Curry", "Dinner - Fried Rice"]
  }
};

function displayMeals() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const nextMealDiv = document.getElementById("next-meal");
  const upcomingList = document.getElementById("upcoming-meals");
  const pastList = document.getElementById("past-meals");
  const noUpcoming = document.getElementById("no-upcoming");

  upcomingList.innerHTML = "";
  pastList.innerHTML = "";
  noUpcoming.classList.add("hidden");

  let upcoming = [];
  let past = [];

  meals.today.forEach(meal => {
    const [h, m] = meal.time.split(":").map(Number);
    const mealMinutes = h * 60 + m;

    if (mealMinutes > currentTime) {
      upcoming.push(meal);
    } else {
      past.push(meal);
    }
  });

  if (upcoming.length > 0) {
    nextMealDiv.innerHTML = `<strong>Next Meal:</strong> ${upcoming[0].name}`;
    upcoming.forEach(meal => {
      const li = document.createElement("li");
      li.textContent = `${meal.time} - ${meal.name}`;
      upcomingList.appendChild(li);
    });
  } else {
    nextMealDiv.innerHTML = "";
    noUpcoming.textContent = "🎉 You have completed all your meals... 🍴 👉 Come again tomorrow!";
    noUpcoming.classList.remove("hidden");
  }

  past.forEach(meal => {
    const li = document.createElement("li");
    li.textContent = `${meal.time} - ${meal.name}`;
    pastList.appendChild(li);
  });
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === "block" ? "none" : "block";

  if (id === "tomorrow-section" && section.style.display === "block") {
    section.innerHTML = "";
    meals.tomorrow.forEach(meal => {
      const p = document.createElement("p");
      p.textContent = `${meal.time} - ${meal.name}`;
      section.appendChild(p);
    });
  }
}

function renderWeeklySchedule() {
  const weeklyDiv = document.getElementById("weekly-schedule");
  weeklyDiv.innerHTML = "";

  Object.keys(meals.weekly).forEach(day => {
    const btn = document.createElement("button");
    btn.className = "accordion-btn";
    btn.textContent = day;
    btn.onclick = () => {
      const contentId = `${day}-meals`;
      let content = document.getElementById(contentId);

      if (!content) {
        content = document.createElement("div");
        content.id = contentId;
        content.className = "accordion-content";
        meals.weekly[day].forEach(meal => {
          const p = document.createElement("p");
          p.textContent = meal;
          content.appendChild(p);
        });
        weeklyDiv.appendChild(content);
      }
      content.style.display = content.style.display === "block" ? "none" : "block";
    };
    weeklyDiv.appendChild(btn);
  });
}

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}

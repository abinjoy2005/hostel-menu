// Hostel Mess Schedule
const schedule = {
  "Monday": [
    { meal: "Breakfast", time: "07:30", menu: "Idly + Coconut Chutney + Sambar + Tea" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Aviyal + Sambar + Bittergourd Thoran + Puli Inji + Butter Milk + Pappadam + Mango Pickle" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Coffee + Cutlet" },
    { meal: "Dinner", time: "19:30", menu: "Fried Rice + Chilli Soya + Ketchup" }
  ],
  "Tuesday": [
    { meal: "Breakfast", time: "07:30", menu: "Puttu + Cherupayar Curry/Kadala Curry + Coffee" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Theeyal + Potato Soy Masala + Kovakka Thoran + Mango Pickle + Pappad" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Tea + Kai Bhaji + Chutney" },
    { meal: "Dinner", time: "19:30", menu: "Rice + Payasam + Cabbage Thoran + Vellarikka Curry + Pappadam" }
  ],
  "Wednesday": [
    { meal: "Breakfast", time: "07:30", menu: "Appam + Ulli Curry + Tea" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Elavan + Kudappan + Sambar + Chammanthi Podi + Buttermilk + Pappad + Mango Pickle" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Coffee + Pazham Pori" },
    { meal: "Dinner", time: "19:30", menu: "Veg Biryani + Soyabean Fry (Dry Roast) + Raita + Pickle" }
  ],
  "Thursday": [
    { meal: "Breakfast", time: "07:30", menu: "Masala Dosa (Sambar + Chamandhi) + Coffee" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Ladies Finger Fry + Beetroot Thoran + Puli Inji + Dal + Buttermilk + Mango Pickle + Pappad" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Tea + Parippu Vada" },
    { meal: "Dinner", time: "19:30", menu: "Mandi Rice + Onion Gravy + Salad" }
  ],
  "Friday": [
    { meal: "Breakfast", time: "07:30", menu: "Coconut Stuffed Idiyappam + White Stew + Tea" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Payasam + Elissery + Sp. Rasam + Pappad + Mango Pickle" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Coffee + Uzhunnu Vada" },
    { meal: "Dinner", time: "19:30", menu: "Rice Kanji + Cherupayar Thoran + Chammanthi + Pappad + Mango Pickle" }
  ],
  "Saturday": [
    { meal: "Breakfast", time: "07:30", menu: "Puri Baji + Coffee" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Tomato-Soya Curry + Pulissery + Beans/Carrot Thoran + Chammanthi Podi + Pappad + Lemon Pickle" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Tea + Ulli Vada" },
    { meal: "Dinner", time: "19:30", menu: "Porotta + Channa Masala" }
  ],
  "Sunday": [
    { meal: "Breakfast", time: "07:30", menu: "Plain Dosa (Red Chutney + Sambar) / Bread Roast + Tea" },
    { meal: "Lunch", time: "12:30", menu: "Rice + Bittergourd Fry + Payar Thoran + Tomato Gravy + Buttermilk + Pickle + Pappad" },
    { meal: "Tea & Snacks", time: "16:00", menu: "Coffee + Sweet Bonda" },
    { meal: "Dinner", time: "19:30", menu: "Chappathi + Kofta / Noodles + Ketchup" }
  ]
};

// Utility functions
function getCurrentTimeMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function displayMeals() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];
  const tomorrow = days[(new Date().getDay() + 1) % 7];
  
  const mealsToday = schedule[today];
  const mealsTomorrow = schedule[tomorrow];
  
  const currentTime = getCurrentTimeMinutes();
  
  const nextMealDiv = document.getElementById("next-meal");
  const upcomingMealsList = document.getElementById("upcoming-meals");
  const pastMealsList = document.getElementById("past-meals");
  
  upcomingMealsList.innerHTML = "";
  pastMealsList.innerHTML = "";
  
  let nextMealFound = false;
  
  mealsToday.forEach((item) => {
    const mealTime = toMinutes(item.time);
    const mealHTML = `<li class="card"><strong>${item.meal}</strong> - ${item.menu} (${item.time})</li>`;
    
    if (mealTime > currentTime && !nextMealFound) {
      nextMealDiv.innerHTML = `<h2>Your next food is ${item.meal}</h2><p>${item.menu} at ${item.time}</p>`;
      nextMealFound = true;
    } 
    
    if (mealTime > currentTime) {
      upcomingMealsList.innerHTML += mealHTML;
    } else {
      pastMealsList.innerHTML += mealHTML;
    }
  });
  
  if (!nextMealFound) {
    nextMealDiv.innerHTML = `<h2>All meals finished for today ✅</h2><p>You had all your meals today. Come again tomorrow! 🍴</p>`;
  }
  
  // Tomorrow section
  const tomorrowSection = document.getElementById("tomorrow-section");
  tomorrowSection.innerHTML = `<h3>${tomorrow}</h3><ul>` + 
    mealsTomorrow.map(m => `<li class="card"><strong>${m.meal}</strong> - ${m.menu} (${m.time})</li>`).join("") 
    + "</ul>";
}

// Toggle accordion
function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === "block" ? "none" : "block";
}

// Weekly schedule
function renderWeeklySchedule() {
  const weeklyDiv = document.getElementById("weekly-schedule");
  const days = Object.keys(schedule);
  
  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "accordion-btn";
    btn.innerText = day + " ⬇";
    btn.onclick = () => {
      const content = document.getElementById("week-" + day);
      content.style.display = content.style.display === "block" ? "none" : "block";
    };
    
    const contentDiv = document.createElement("div");
    contentDiv.id = "week-" + day;
    contentDiv.className = "accordion-content";
    contentDiv.innerHTML = "<ul>" + schedule[day].map(m => 
      `<li class="card"><strong>${m.meal}</strong> - ${m.menu} (${m.time})</li>`).join("") + "</ul>";
    
    weeklyDiv.appendChild(btn);
    weeklyDiv.appendChild(contentDiv);
  });
}

displayMeals();
renderWeeklySchedule();
setInterval(displayMeals, 60000); // Update every minute

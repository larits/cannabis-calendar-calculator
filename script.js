// Function to calculate the calendar, including date of harvest
function calculateCalendar(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get user input values
    const strain = document.getElementById("strain").value;
    const plantingDate = new Date(document.getElementById("planting-date").value);
    const calendarResults = document.getElementById("calendar-results");

    // Clear previous results
    calendarResults.innerHTML = '';

    // Check if autoflowering or feminized is selected
    const growthType = document.querySelector('input[name="growth-type"]:checked').value;

    // Define the growth stages for autoflowering and feminized
    const stages = {
        autoflowering: [
            {
                stage: "Germination and Seedling Stage (Duration: 1 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul> 
                <li> During this stage, your cannabis seeds will germinate and grow into seedlings. </li> 
                <li> Light: Duration: 18 to 24 hours per day. Intensity: 100-250 µmol/m²/s. Spectrum: Blue light (400-500 nm) for strong vegetative growth. </li>
                <li> Water: Every 2-3 days, or as needed to maintain soil moisture.</li>
                <li> N-P-K Ratio: 1-2-2 or 2-1-1 at quarter strength if necessary.</li>
                </ul>
            `
            },
            {
                stage: "Early Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul>  
                <li> In the early vegetative stage, your plants will grow their first sets of true leaves.  </li>
                <li> Light: Duration: 18 hours per day. Intensity: 250-400 µmol/m²/s. Spectrum: Balanced spectrum (400-700 nm) for overall growth. </li>
                <li> Water: Every 2-4 days, depending on environmental conditions and soil moisture levels.</li>
                <li> N-P-K Ratio: Increase to a balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
            },
            
            {
                stage: "Late Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> During the late vegetative stage, your plants will continue to grow and develop. Watch for signs of nutrient deficiencies or pests. </li>
                <li> Light: Duration: 18 hours per day. Intensity: 400-600 µmol/m²/s. Spectrum: Balanced spectrum (continue with same spectrum). </li>
                <li> Water: Every 3-5 days, adjusting as needed based on soil dryness.</li>
                <li> N-P-K Ratio: Maintain the balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
  
              
            },
            {
                stage: "Pre-Flowering Stage (Duration: 1 to 2 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> This stage marks the transition to the flowering stage. Your plants will start to show their sex (male or female). </li>
                <li> Light: Duration: 16 to 18 hours per day. Intensity: 600-800 µmol/m²/s. Spectrum: Gradually increase the proportion of red light (600-700 nm). </li>
                <li> Water: Water every 3-5 days or when the top 2-3 inches (5-7.5 cm) of soil becomes dry.</li>
                <li> N-P-K Ratio: Shift to a ratio of 1-3-3 or 2-4-4 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Flowering Stage (Duration: 2 to 3 weeks)",
                weeks: 3,
                description:  `
                <ul>  
                <li> In the flowering stage, your female plants will develop buds. </li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 2-4 days, adjusting based on soil dryness and plant needs.</li>
                <li> N-P-K Ratio: Maintain a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
              },
            {
                stage: "Late Flowering and Ripening Stage (Duration: 1 to 2 weeks)",
                weeks: 2,
                description:  `
                <ul>  
                <li> During this stage, your buds will mature and ripen. Pay close attention to trichome development for harvest readiness.</li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 4-7 days or as needed, avoiding overwatering as the plant approaches harvest.</li>
                <li> N-P-K Ratio: Continue with a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Harvest (Duration: 1 week)",
                weeks: 1,
                description: `
                <ul>  
                <li>     Congratulations! It's time to harvest your autoflowering cannabis plants. Harvest when the trichomes are cloudy for the best potency. </li>
                </ul>
                `
          
            }
        ],
        feminized: [
            {
                stage: "Germination and Seedling Stage (Duration: 1 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul> 
                <li> During this stage, your cannabis seeds will germinate and grow into seedlings. </li> 
                <li> Light: Duration: 18 to 24 hours per day. Intensity: 100-250 µmol/m²/s. Spectrum: Blue light (400-500 nm) for strong vegetative growth. </li>
                <li> Water: Every 2-3 days, or as needed to maintain soil moisture.</li>
                <li> N-P-K Ratio: 1-2-2 or 2-1-1 at quarter strength if necessary.</li>
                </ul>
            `
            },
            {
                stage: "Early Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul>  
                <li> In the early vegetative stage, your plants will grow their first sets of true leaves.  </li>
                <li> Light: Duration: 18 hours per day. Intensity: 250-400 µmol/m²/s. Spectrum: Balanced spectrum (400-700 nm) for overall growth. </li>
                <li> Water: Every 2-4 days, depending on environmental conditions and soil moisture levels.</li>
                <li> N-P-K Ratio: Increase to a balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
            },
            
            {
                stage: "Late Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> During the late vegetative stage, your plants will continue to grow and develop. Watch for signs of nutrient deficiencies or pests. </li>
                <li> Light: Duration: 18 hours per day. Intensity: 400-600 µmol/m²/s. Spectrum: Balanced spectrum (continue with same spectrum). </li>
                <li> Water: Every 3-5 days, adjusting as needed based on soil dryness.</li>
                <li> N-P-K Ratio: Maintain the balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
  
              
            },
            {
                stage: "Pre-Flowering Stage (Duration: 1 to 2 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> This stage marks the transition to the flowering stage. Your plants will start to show their sex (male or female). </li>
                <li> Light: Duration: 16 to 18 hours per day. Intensity: 600-800 µmol/m²/s. Spectrum: Gradually increase the proportion of red light (600-700 nm). </li>
                <li> Water: Water every 3-5 days or when the top 2-3 inches (5-7.5 cm) of soil becomes dry.</li>
                <li> N-P-K Ratio: Shift to a ratio of 1-3-3 or 2-4-4 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Flowering Stage (Duration: 2 to 3 weeks)",
                weeks: 3,
                description:  `
                <ul>  
                <li> In the flowering stage, your female plants will develop buds. </li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 2-4 days, adjusting based on soil dryness and plant needs.</li>
                <li> N-P-K Ratio: Maintain a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
              },
            {
                stage: "Late Flowering and Ripening Stage (Duration: 1 to 2 weeks)",
                weeks: 2,
                description:  `
                <ul>  
                <li> During this stage, your buds will mature and ripen. Pay close attention to trichome development for harvest readiness.</li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 4-7 days or as needed, avoiding overwatering as the plant approaches harvest.</li>
                <li> N-P-K Ratio: Continue with a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Harvest (Duration: 1 week)",
                weeks: 1,
                description: `
                <ul>  
                <li>     Congratulations! It's time to harvest your autoflowering cannabis plants. Harvest when the trichomes are cloudy for the best potency. </li>
                </ul>
                `
          
            }
        ],
      regular: [
            {
                stage: "Germination and Seedling Stage (Duration: 1 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul> 
                <li> During this stage, your cannabis seeds will germinate and grow into seedlings. </li> 
                <li> Light: Duration: 18 to 24 hours per day. Intensity: 100-250 µmol/m²/s. Spectrum: Blue light (400-500 nm) for strong vegetative growth. </li>
                <li> Water: Every 2-3 days, or as needed to maintain soil moisture.</li>
                <li> N-P-K Ratio: 1-2-2 or 2-1-1 at quarter strength if necessary.</li>
                </ul>
            `
            },
            {
                stage: "Early Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul>  
                <li> In the early vegetative stage, your plants will grow their first sets of true leaves.  </li>
                <li> Light: Duration: 18 hours per day. Intensity: 250-400 µmol/m²/s. Spectrum: Balanced spectrum (400-700 nm) for overall growth. </li>
                <li> Water: Every 2-4 days, depending on environmental conditions and soil moisture levels.</li>
                <li> N-P-K Ratio: Increase to a balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
            },
            
            {
                stage: "Late Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> During the late vegetative stage, your plants will continue to grow and develop. Watch for signs of nutrient deficiencies or pests. </li>
                <li> Light: Duration: 18 hours per day. Intensity: 400-600 µmol/m²/s. Spectrum: Balanced spectrum (continue with same spectrum). </li>
                <li> Water: Every 3-5 days, adjusting as needed based on soil dryness.</li>
                <li> N-P-K Ratio: Maintain the balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
  
              
            },
            {
                stage: "Pre-Flowering Stage (Duration: 1 to 2 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> This stage marks the transition to the flowering stage. Your plants will start to show their sex (male or female). </li>
                <li> Light: Duration: 16 to 18 hours per day. Intensity: 600-800 µmol/m²/s. Spectrum: Gradually increase the proportion of red light (600-700 nm). </li>
                <li> Water: Water every 3-5 days or when the top 2-3 inches (5-7.5 cm) of soil becomes dry.</li>
                <li> N-P-K Ratio: Shift to a ratio of 1-3-3 or 2-4-4 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Flowering Stage (Duration: 2 to 3 weeks)",
                weeks: 3,
                description:  `
                <ul>  
                <li> In the flowering stage, your female plants will develop buds. </li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 2-4 days, adjusting based on soil dryness and plant needs.</li>
                <li> N-P-K Ratio: Maintain a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
              },
            {
                stage: "Late Flowering and Ripening Stage (Duration: 1 to 2 weeks)",
                weeks: 2,
                description:  `
                <ul>  
                <li> During this stage, your buds will mature and ripen. Pay close attention to trichome development for harvest readiness.</li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 4-7 days or as needed, avoiding overwatering as the plant approaches harvest.</li>
                <li> N-P-K Ratio: Continue with a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Harvest (Duration: 1 week)",
                weeks: 1,
                description: `
                <ul>  
                <li>     Congratulations! It's time to harvest your autoflowering cannabis plants. Harvest when the trichomes are cloudy for the best potency. </li>
                </ul>
                `
          
            }
        ],
      cbd: [
            {
                stage: "Germination and Seedling Stage (Duration: 1 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul> 
                <li> During this stage, your cannabis seeds will germinate and grow into seedlings. </li> 
                <li> Light: Duration: 18 to 24 hours per day. Intensity: 100-250 µmol/m²/s. Spectrum: Blue light (400-500 nm) for strong vegetative growth. </li>
                <li> Water: Every 2-3 days, or as needed to maintain soil moisture.</li>
                <li> N-P-K Ratio: 1-2-2 or 2-1-1 at quarter strength if necessary.</li>
                </ul>
            `
            },
            {
                stage: "Early Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 3,
                description: `
                <ul>  
                <li> In the early vegetative stage, your plants will grow their first sets of true leaves.  </li>
                <li> Light: Duration: 18 hours per day. Intensity: 250-400 µmol/m²/s. Spectrum: Balanced spectrum (400-700 nm) for overall growth. </li>
                <li> Water: Every 2-4 days, depending on environmental conditions and soil moisture levels.</li>
                <li> N-P-K Ratio: Increase to a balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
            },
            
            {
                stage: "Late Vegetative Stage (Duration: 2 to 3 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> During the late vegetative stage, your plants will continue to grow and develop. Watch for signs of nutrient deficiencies or pests. </li>
                <li> Light: Duration: 18 hours per day. Intensity: 400-600 µmol/m²/s. Spectrum: Balanced spectrum (continue with same spectrum). </li>
                <li> Water: Every 3-5 days, adjusting as needed based on soil dryness.</li>
                <li> N-P-K Ratio: Maintain the balanced ratio of 3-1-2 or 2-1-2 at half strength. </li>
                </ul>
                `
  
              
            },
            {
                stage: "Pre-Flowering Stage (Duration: 1 to 2 weeks) ",
                weeks: 2,
                description: `
                <ul>  
                <li> This stage marks the transition to the flowering stage. Your plants will start to show their sex (male or female). </li>
                <li> Light: Duration: 16 to 18 hours per day. Intensity: 600-800 µmol/m²/s. Spectrum: Gradually increase the proportion of red light (600-700 nm). </li>
                <li> Water: Water every 3-5 days or when the top 2-3 inches (5-7.5 cm) of soil becomes dry.</li>
                <li> N-P-K Ratio: Shift to a ratio of 1-3-3 or 2-4-4 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Flowering Stage (Duration: 2 to 3 weeks)",
                weeks: 3,
                description:  `
                <ul>  
                <li> In the flowering stage, your female plants will develop buds. </li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 2-4 days, adjusting based on soil dryness and plant needs.</li>
                <li> N-P-K Ratio: Maintain a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
              },
            {
                stage: "Late Flowering and Ripening Stage (Duration: 1 to 2 weeks)",
                weeks: 2,
                description:  `
                <ul>  
                <li> During this stage, your buds will mature and ripen. Pay close attention to trichome development for harvest readiness.</li>
                <li> Light: Duration: 12 to 18 hours per day. Intensity: 600-1000 µmol/m²/s. Spectrum: Maintain a higher proportion of red light (600-700 nm) and some far-red light (700-800 nm). </li>
                <li> Water: Every 4-7 days or as needed, avoiding overwatering as the plant approaches harvest.</li>
                <li> N-P-K Ratio: Continue with a ratio of 0-5-5 or 0-10-10 at half strength. </li>
                </ul>
                `
            },
            {
                stage: "Harvest (Duration: 1 week)",
                weeks: 1,
                description: `
                <ul>  
                <li>     Congratulations! It's time to harvest your autoflowering cannabis plants. Harvest when the trichomes are cloudy for the best potency. </li>
                </ul>
                `
          
            }
        ]
    };

    // Function to add weeks to a date
    function addWeeksToDate(date, weeks) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + (weeks * 7));
        return newDate;
    }

    // Calculate and display the calendar
    stages[growthType].forEach((stage) => {
        const endDate = addWeeksToDate(plantingDate, stage.weeks);
        const stageDescription = stage.stage;
        const stageInfo = stage.description; // Added description

        const calendarItem = document.createElement("div");
        calendarItem.innerHTML = `<strong>${stageDescription}:</strong> ${plantingDate.toDateString()} to ${endDate.toDateString()}<br>${stageInfo}`; // Include description
        calendarResults.appendChild(calendarItem);

        // Update plantingDate for the next stage
        plantingDate.setTime(endDate.getTime() + 1); // Set planting date to the day after the current stage ends
    });

    // Calculate and display the date of harvest
    const harvestStage = stages[growthType].find((stage) => stage.stage === "Harvest");
    if (harvestStage) {
        const harvestDate = addWeeksToDate(plantingDate, harvestStage.weeks);
        const harvestItem = document.createElement("div");
        harvestItem.innerHTML = `<strong>Date of Harvest:</strong> ${harvestDate.toDateString()}`;
        calendarResults.appendChild(harvestItem);
    }

    // Display the results in the #calendar-results section
    calendarResults.innerHTML = `
        <h2>${strain} Calendar</h2>
        ${calendarResults.innerHTML}
    `;
}

// Add a submit event listener to the form
const calendarForm = document.getElementById("calendar-form");
calendarForm.addEventListener("submit", calculateCalendar);

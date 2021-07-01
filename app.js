/**
 * global variables
 */
const birthDay = document.getElementById('birth-day');
const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const ageDev = document.getElementById('age');
const calcBtn = document.getElementById('calc');
const error = document.getElementById('error');

// calculate the current date
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();

// to make the max date available is yesterday max="2018-12-31"
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayString = formatDate(yesterday);
birthDay.setAttribute('max', yesterdayString);

// array stores the nomber of days in each month
const monthDays = [0, 31, (currentYear % 4) ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * End Global Variables
 * Start Helper Functions
*/

/**
 * @description function to return date in the form yyyy-mm-dd
 * @param {object} date 
 * @returns {string} date
 */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * @description function to get error message and show it to the user
 * @param {string} message 
 */
const showError = (message) => {
    error.innerHTML = message;
    error.style.display = 'block';
    setTimeout(() => {
        error.style.display = 'none';
    }, 2000);
};

/**
 * End Helper Functions
 * Begin Main Functions
*/

/**
 * @description function to calculate the age from the birth day
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 * @returns {object} age
 */
const calculateAge = (day, month, year) => {
    let age = {
        years: 0,
        months: 0,
        days: 0
    };

    age.years = currentYear - year;

    if (currentMonth > month) {
        age.months = currentMonth - month;
    } else {
        age.years--;
        age.months = 12 - month + currentMonth;
    }

    if (currentDay > day) {
        age.days = currentDay - day;
    } else {
        age.months--;
        const prevMonth = currentMonth - 1;
        age.days = monthDays[prevMonth] - day + currentDay;

        if (age.months < 0) {
            age.months = 11;
            age.years--;
        }
    }

    return age;
};

/**
 * @description function updates the DOM to show the age 
 * @param {object} age 
 */
const showAge = (age) => {
    let stringYear = age.years.toString();
    let stringMonth = age.months.toString();
    let stringDay = age.days.toString();

    stringYear += (age.years > 1 ? ' years' : ' year');
    stringMonth += (age.months > 1 ? ' months' : ' month');
    stringDay += (age.days > 1 ? ' days' : ' day');

    year.innerHTML = stringYear;
    month.innerHTML = stringMonth;
    day.innerHTML = stringDay;

    ageDev.style.display = 'block';
};

/**
 * @description function to get the date of birth from the DOM
 * @returns {object} DOB
 */
const getDOB = () => {
    let DOB = {
        year: 0,
        month: 0,
        day: 0
    };

    const dob = new Date(birthDay.value);

    DOB.year = dob.getFullYear();
    DOB.month = dob.getMonth() + 1;
    DOB.day = dob.getDate();

    return DOB;
};

/**
 * End Main Functions
 * Begin Events
 */

// eventListener to calculate the age and show it to the DOM
calcBtn.addEventListener('click', () => {
    try {
        const dob = getDOB();
        if (isNaN(dob.year) || isNaN(dob.month) || isNaN(dob.day))
            throw new Error('Invalid date. Please, try again.');

        const year = parseInt(dob.year);
        const month = parseInt(dob.month);
        const day = parseInt(dob.day);
        const age = calculateAge(day, month, year);
        showAge(age);
    } catch (error) {
        showError(error.message);
    }
});
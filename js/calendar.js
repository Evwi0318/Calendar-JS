export function renderCalendar(year, month) {
    const today = new Date();
    const y = year  !== undefined ? year  : today.getFullYear();
    const m = month !== undefined ? month : today.getMonth();

    // Update the month/year label in the header
    const label = document.getElementById('current-month-label');
    const monthName = new Date(y, m, 1).toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });
    label.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // Clear the calendar and rebuild it
    const tbody = document.getElementById('calendar-body');
    tbody.innerHTML = '';

    // Figure out which column to start on (weeks start on Monday)
    const firstDay = new Date(y, m, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrevMonth = new Date(y, m, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

    let day = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < totalCells; i += 7) {
        const tr = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cellIndex = i + j;
            const td = document.createElement('td');

            if (cellIndex < startOffset) {
                // Days from the previous month
                const prevDay = daysInPrevMonth - startOffset + cellIndex + 1;
                td.classList.add('other-month');
                td.appendChild(createDayNumber(prevDay));
            } else if (day > daysInMonth) {
                // Days from the next month
                td.classList.add('other-month');
                td.appendChild(createDayNumber(nextMonthDay));
                nextMonthDay++;
            } else {
                // Days in the current month
                const isToday = day === today.getDate() && m === today.getMonth() && y === today.getFullYear();
                if (isToday) td.classList.add('today');

                const isoDate = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
                const time = document.createElement('time');
                time.setAttribute('datetime', isoDate);
                time.appendChild(createDayNumber(day));
                td.appendChild(time);
                td.dataset.date = isoDate;
                day++;
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

function createDayNumber(num) {
    const span = document.createElement('span');
    span.classList.add('day-number');
    span.textContent = num;
    return span;
}


export function initCalendarNav() {
    // Keep track of which month we are viewing
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth(); // 0 = January, 11 = December

    document.getElementById('prev-month').addEventListener('click', function () {
        // Go one month back
        currentMonth = currentMonth - 1;
        if (currentMonth < 0) {
            currentMonth = 11; // December
            currentYear = currentYear - 1;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById('next-month').addEventListener('click', function () {
        // Go one month forward
        currentMonth = currentMonth + 1;
        if (currentMonth > 11) {
            currentMonth = 0; // January
            currentYear = currentYear + 1;
        }
        renderCalendar(currentYear, currentMonth);
    });
}
import { renderCalendar, initCalendarNav, updateHolidays } from './calendar.js';

import { renderTodayDate } from './today.js';
import { initTodos } from './todo.js';

renderTodayDate();
renderCalendar();
updateHolidays(new Date().getFullYear());
initCalendarNav();
initTodos();
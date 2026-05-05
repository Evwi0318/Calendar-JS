// Returns a list of Swedish public holidays for the given year
// Each holiday: { date: "2026-12-25", name: "Juldagen" }
export function getHolidays(year) {
    return [
        { date: year + '-01-01', name: 'Nyårsdagen' },
        { date: year + '-01-06', name: 'Trettondedag jul' },
        { date: year + '-05-01', name: 'Första maj' },
        { date: year + '-06-06', name: 'Nationaldagen' },
        { date: year + '-12-24', name: 'Julafton' },
        { date: year + '-12-25', name: 'Juldagen' },
        { date: year + '-12-26', name: 'Annandag jul' },
        { date: year + '-12-31', name: 'Nyårsafton' },
        // Easter-based holidays move every year — add manually or calculate separately
        { date: getGoodFriday(year),   name: 'Långfredagen' },
        { date: getEasterSunday(year), name: 'Påskdagen' },
        { date: getEasterMonday(year), name: 'Annandag påsk' },
        { date: getAscension(year),    name: 'Kristi himmelsfärd' },

                { date: getMidsummer(year),    name: 'Midsommardag' },
        { date: getAllSaints(year),    name: 'Alla helgons dag' },
    ];
}

// Easter Sunday (Meeus/Jones/Butcher algorithm)
function getEasterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31); // 1-indexed
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return toIso(year, month, day);
}

function getGoodFriday(year) {
    return addDays(getEasterSunday(year), -2);
}

function getEasterMonday(year) {
    return addDays(getEasterSunday(year), 1);
}

function getAscension(year) {
    return addDays(getEasterSunday(year), 39);
}

// Midsummer day = Saturday between June 20-26
function getMidsummer(year) {
    for (let day = 20; day <= 26; day++) {
        const date = new Date(year, 5, day);
        if (date.getDay() === 6) return toIso(year, 6, day);
    }
}

// All Saints' Day = Saturday between Oct 31 - Nov 6
function getAllSaints(year) {
    for (let day = 31; day <= 37; day++) {
        const month = day <= 31 ? 10 : 11;
        const d = day <= 31 ? day : day - 31;
        const date = new Date(year, month - 1, d);
        if (date.getDay() === 6) return toIso(year, month, d);
    }
}

function addDays(isoDate, days) {
    const date = new Date(isoDate + 'T00:00:00');
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function toIso(year, month, day) {
    return year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
}
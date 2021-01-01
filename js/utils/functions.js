const getMonthYear = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();

    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const getMonthYearLocalStorage = () => {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    const date = new Date();

    return `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
}

const Functions = {
    getMonthYear: getMonthYear,
    getMonthYearLocalStorage: getMonthYearLocalStorage
}

export default Functions;
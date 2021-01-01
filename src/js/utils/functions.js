const getMonthYear = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();

    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const Functions = {
    getMonthYear: getMonthYear
}

export default Functions;
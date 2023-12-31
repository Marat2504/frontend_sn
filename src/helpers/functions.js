import store from "@/store";

const isImg = (name) => {
    const lowerCaseFileName = name.toLowerCase();
    return lowerCaseFileName.endsWith('.png') || lowerCaseFileName.endsWith('.jpeg');
}

const findAndToggle = (array, id) => {
    const index = array.findIndex(obj => obj.id === id);
    if (index !== -1) {
        array[index].active = !array[index].active;
    }
    return array
}

function isUserLoggedIn() {
    return store.getters['isLoggedIn']
}

function selectDate(str) {
    const date = new Date(str)
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()

    return `${year}-${month}-${day} | ${hours} : ${minutes} : ${seconds}`
}

function allDistance(arr) {
    const sum = arr.reduce((accumulator, currentValue) => {
        const distance = parseFloat(currentValue.distance.replace(',', '.'));
        return accumulator + distance;
    }, 0);
    return sum.toFixed(2);
}

function sumTime(arr) {
    const times = arr.map(el => el.duration)
    let totalSeconds = 0;

    times.forEach(time => {
        const parts = time.split(':');
        let seconds = 0;

        if (parts.length === 3) {
            const hours = parseInt(parts[0]);
            const minutes = parseInt(parts[1]);
            seconds = parseInt(parts[2]);

            totalSeconds += hours * 3600 + minutes * 60 + seconds;
        } else if (parts.length === 2) {
            const minutes = parseInt(parts[0]);
            seconds = parseInt(parts[1]);

            totalSeconds += minutes * 60 + seconds;
        }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

export default {
    isImg,
    findAndToggle,
    isUserLoggedIn,
    selectDate,
    allDistance,
    sumTime,
    padNumber
}

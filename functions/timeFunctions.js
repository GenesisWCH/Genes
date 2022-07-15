// Link: https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

const getMonthWord = (month) => {
    // switch cases for converting 0 to 11 to strings by month
    switch (month) {
        case 0:
            return "Jan"
        case 1:
            return "Feb"
        case 2:
            return "Mar"
        case 3:
            return "Apr"
        case 4:
            return "May"
        case 5:
            return "Jun"
        case 6:
            return "Jul"
        case 7:
            return "Aug"
        case 8:
            return "Sep"
        case 9:
            return "Oct"
        case 10:
            return "Nov"
        case 11:
            return "Dec"
        default:
            return;
    }
}

const toJSDateStr = (jsDate) => {
    console.log(jsDate)
    var day = jsDate.getDate()
    var month = getMonthWord(jsDate.getMonth())
    var year = jsDate.getFullYear()
    var str = day + " " + month + " " + year
    return str
}

const toTimeStr = (fsDate) => {
    var jsDate = fsDate.toDate()
    var str = jsDate.toTimeString()
    return tConvert(str.slice(0, 5))
}


const toLabelString = (name, startTime, endTime) => {
    var str = name + ", " + startTime + " to " + endTime
    return str
}

export { toJSDateStr, toTimeStr, toLabelString };


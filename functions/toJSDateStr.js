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

export default toJSDateStr;
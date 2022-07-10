useEffect(() => {
    const getDates = () => {
        var dummyDates = []
        var currDate = new Date()
        var nextDate = new Date()
        for (var i = 0; i < 15; i++) {
            nextDate.setDate(currDate.getDate() + i)
            var day = nextDate.getDate()
            var month = getMonthWord(nextDate.getMonth())
            var year = nextDate.getFullYear()
            var string = day + " " + month + " " + year
            dummyDates.push({ label: string, value: string })
        }

        setDates(dummyDates)
    };
    getDates();
}, []);

// use section list with venue name as header: each item contains a start time, end time
// update docs with venue name

// const DATA = [
//   {
//     venue:  's', data: [
//       { venue: 's', startTime: '', endTime: '' }
//     ]
//   }
// ]
// startTime and endTime may be an object {string: '...', Timestamp field: ...}
// selecting button will untoggle all other buttons and set the relevant states to query 
// confirm button writes the doc if possible, else catch possible errors





// use map to check if venue is already in the list. see if i can make a nested object

// // Update header text
// document.querySelector('#header').innerHTML = message

// const DATA = [
//   {title: 's', start:1000, end:1100},
//   {title: 's', start:1100, end:1200},
//   {title: 't', start:1000, end:1000},
// ]

// const list = [1, {start: 1}]

// for (var i=0; i < DATA.length; i++) {
//   var itemTitle = DATA[i].title
//   var flag = false
//   for (var j=0; i < list.length; i++) {
//     if (list[j].title === itemTitle) {
//       flag = true
//       list[j].data.push(DATA[i])
//       break
//     }
//   }
//   if (flag === false) {

//   }
// }


// // Log to console
// console.log(list)
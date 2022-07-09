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
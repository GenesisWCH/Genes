const testSetRoute = () => {
    console.log('calling testSetRoute')
    const map = new Map()
    map.set('02-AHU1', null)
    map.set('02-AHU1 dummy', '02-AHU1')
    map.set('02-AHU2', '02-AHU1 dummy')
    console.log(map)
    var currPlace = '02-AHU2'
    console.log(currPlace)
    var text = ''
    while (currPlace != null) {
        text = ('->' + currPlace + text)
        console.log('currPlace:', currPlace)
        currPlace = map.get(currPlace)
    }
    text.slice(2)
    console.log(text)
    setRouteText(text)
    setShowDirection(true)
    console.log(routeText)
}


const setVisitedDummy = (map) => {
    console.log('calling setVisitedDummy')
    const visited = new Map()
    for (let key of map.keys()) {
        console.log(key);
        visited.set(key, false)
    }
    return visited
}

const getNbrsDummy = (place, map) => {
    console.log('calling getNbrsDummy')
    console.log(map)
    nbrList = []
    if (map.has(place)) {
        var nbrs = map.get(place)
        for (var i = 0; i < nbrs.length; i++) {
            nbrList.push(nbrs[i])
        }
        console.log('nbrList:', nbrList)
        return nbrList
    } else {
        console.log("\nNo such document!\n\nCurrent Place checked:", place);
    }
}

const BFSDummy = () => {
    console.log('calling BFSDummy', ' ', start, '->', end)

    const dummyMap = new Map()

    dummyMap.set('02-AHU1', ['02-AHU1 dummy'])
    dummyMap.set('02-AHU1 dummy', ['02-AHU1', 'SR 5 dummy'])
    dummyMap.set('02-AHU2', ['02-AHU2 dummy'])
    dummyMap.set('02-AHU2 dummy', ['02-AHU2', 'L2 Convenience Store dummy', 'SR 10 dummy'])
    dummyMap.set('02-AHU4', ['Wire Centre dummy'])
    dummyMap.set('Cerebro@SoC', ['Student Area'])
    dummyMap.set('Computing Club', ['ICPC Lab dummy'])
    dummyMap.set('DR 12', ['DR 12 dummy'])
    dummyMap.set('DR 12 dummy', ['DR 12', 'TR 11', 'L2 Undergraduate Studies dummy', 'TR 10 dummy'])
    dummyMap.set('Foyer Entrance', ['L2_Foyer', 'L2 Lift'])
    dummyMap.set('ICPC Lab', ['ICPC Lab dummy'])
    dummyMap.set('ICPC Lab dummy', ['ICPC Lab', 'L2 Convenience Store dummy', 'Wire Centre dummy', 'Computing Club'])
    dummyMap.set('L2 Convenience Store', ['L2 Convenience Store dummy'])
    dummyMap.set('L2 Convenience Store corner', ['L2 Convenience Store dummy', 'ICPC Lab dummy'])
    dummyMap.set('L2 Convenience Store dummy', ['L2 Convenience Store', '02-AHU2 dummy', 'Stairs to COM2', 'L2 Convenience Store corner'])
    dummyMap.set('L2 Lift', ['Foyer Entrance'])
    dummyMap.set('L2 Undergraduate Studies', ['L2 Undergraduate Studies dummy'])
    dummyMap.set('L2 Undergraduate Studies dummy', ['L2 Undergraduate Studies', 'Wire Centre dummy', 'DR 12 dummy', 'TR 11'])
    dummyMap.set('L2_Foyer', ["Students' Lounge", 'SR 1', 'Student Area', 'SR 7 dummy', 'TR 10 dummy', 'Foyer Entrance'])
    dummyMap.set('Linkway', ['SR 6 dummy', 'Makers@SoC dummy'])
    dummyMap.set('Makers@SoC', ['Makers@SoC dummy'])
    dummyMap.set('Makers@SoC dummy', ['Makers@SoC', 'SR 6 dummy', 'Linkway', 'SR 5 dummy'])
    dummyMap.set('SR 1', ['L2_Foyer'])
    dummyMap.set('SR 10', ['SR 10 dummy'])
    dummyMap.set('SR 10 dummy', ['SR 10', 'VC Room', 'SR 9 dummy', '02-AHU2 dummy'])
    dummyMap.set('SR 2', ['Student Area'])
    dummyMap.set('SR 3', ['SR 8 dummy'])
    dummyMap.set('SR 5', ['SR 5 dummy'])
    dummyMap.set('SR 5 dummy', ['02-AHU1 dummy', 'SR 5', 'Makers@SoC dummy'])
    dummyMap.set('SR 6', ['SR 6 dummy'])
    dummyMap.set('SR 6 dummy', ['SR 6', 'Student Area', 'Linkway', 'Makers@SoC dummy'])
    dummyMap.set('SR 7', ['SR 7 dummy'])
    dummyMap.set('SR 7 dummy', ['L2_Foyer', 'SR 7', 'SR 8 dummy'])
    dummyMap.set('SR 8', ['SR 8 dummy'])
    dummyMap.set('SR 8 dummy', ['SR 7 dummy', 'SR 8', 'SR 3', 'SR 9 dummy'])
    dummyMap.set('SR 9', ['SR 9 dummy'])
    dummyMap.set('SR 9 dummy', ['SR 9', 'VC Room', 'SR 10 dummy', 'SR 8 dummy'])
    dummyMap.set('Stair 5 (North)', ['Student Area'])
    dummyMap.set('Stairs to COM 2', ['L2 Convenience Store dummy'])
    dummyMap.set('Student Area', ['SR 6 dummy', 'Toilet near Stair 5 (North)', 'Stair 5 (North)', 'SR 2', 'L2_Foyer'])
    dummyMap.set("Students' Lounge", ['L2_Foyer', 'TR 10 dummy'])
    dummyMap.set('TR 10', ['TR 10 dummy'])
    dummyMap.set('TR 10 dummy', ['TR 10', 'DR 12 dummy', "Students' Lounge", 'L2_Foyer'])
    dummyMap.set('TR 11', ['DR 12 dummy', 'L2 Undergraduate Studies dummy'])
    dummyMap.set('Toilet near Stair 5 (North)', ['Student Area'])
    dummyMap.set('VC Room', ['SR 9 dummy', 'SR 10 dummy'])
    dummyMap.set('Wire Centre', ['Wire Centre dummy'])
    dummyMap.set('Wire Centre dummy', ['ICPC Lab dummy', '02-AHU4', 'L2 Undergraduate Studies dummy', 'Wire Centre'])

    console.log(dummyMap)
    const visited = setVisitedDummy(dummyMap)


    var queue = []
    queue.push(start)
    console.log('Queue:', queue)


    const pathMap = new Map()
    pathMap.set(start, null)

    visited.set(start, true)
    console.log('Marked', start, 'as visited!')


    while (queue.length != 0) {
        var next = []
        for (var i = 0; i < queue.length; i++) {
            var currPlace = queue[i]
            console.log('Current place:', currPlace)
            var nbrs = getNbrsDummy(currPlace, dummyMap)

            for (var j = 0; j < nbrs.length; j++) {
                var neighbour = nbrs[j]
                if (!visited.get(neighbour)) {
                    console.log(neighbour, 'is visited!')
                    visited.set(neighbour, true)
                    next.push(neighbour)
                    pathMap.set(neighbour, currPlace)
                }
            }
        }
        if (pathMap.has(end)) {
            break
        }
        queue = next
    }
    setRoute(pathMap)
}


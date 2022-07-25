const testSetRoute = (map) => {
    // console.log('calling testSetRoute')
    // const map = new Map()
    // map.set('02-AHU1', null)
    // map.set('02-AHU1 dummy', '02-AHU1')
    // map.set('02-AHU2', '02-AHU1 dummy')
    // console.log(map)
    var currPlace = '02-AHU2'
    console.log(currPlace)
    var text = ''
    while (currPlace != null) {
        text = ('->' + currPlace + text)
        console.log('currPlace:', currPlace)
        currPlace = map.get(currPlace)
    }
    text.slice(2)
    // console.log(text)
    // setRouteText(text)
    // setShowDirection(true)
    // console.log(routeText)
    return text
}


const setVisitedDummy = (map) => {
    // console.log('calling setVisitedDummy')
    const visited = new Map()
    for (let key of map.keys()) {
        // console.log(key);
        visited.set(key, false)
    }
    return visited
}

const setVisitedDummyTest = (map, setMap) => {
    if (map.keys() == setMap.keys()) {
    }
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
        // console.log("\nNo such document!\n\nCurrent Place checked:", place);
        return false
    }
}

const BFSDummy = (dummyMap) => {
    console.log('calling BFSDummy', ' ', start, '->', end)
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

export { testSetRoute, setVisitedDummy, getNbrsDummy, BFSDummy };
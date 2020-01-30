
/** Clears the element
 * 
 * @param {HTMLElement} elem An element to clear
 */
function clear(elem) {
    if (elem) {
        let children = Array.of(...elem.childNodes);
        children.forEach(elem => elem.remove());
    }
}

/** Creates a list from user's answers
 * 
 * @param {HTMLUListElement} ul 
 */
function createList(ul) {
    if (ul) {
        let answer = true;
        while (answer) {
            answer = prompt('Enter the text for the list item', '');
            if (answer) {
                let li = document.createElement('li');
                li.innerText = answer;
                ul.appendChild(li);
            }
        }
    }
}

/** Creates a tree with ul and li tags from the given data object
 * 
 * @param {HTMLElement} container A container to place the list
 * @param {*} data A data to make the list of
 */
function createTree(parent, data) {
    if (parent && typeof (data) === 'object') {
        if (!Object.keys(data).length) return;
        let ul = document.createElement('ul');
        parent.appendChild(ul);
        for (let key in data) {
            let li = document.createElement('li');
            li.innerText = key;
            ul.appendChild(li);
            createTree(li, data[key]);
        }
    }
}

/** Adds numbers of descendants in non-empty list items of the list
 * 
 * @param {HTMLUListElement | HTMLOListElement} list 
 */
function showDescendantsNumbers(list) {
    if (!list) {
        return 0;
    }
    let count = 0;

    for (let li of list.children) {
        count++;  // the count increments for every leaf
        count += showNumbersInLeaf(li);  // the number in leaves gets added to the count
    }

    function showNumbersInLeaf(li) {
        let count = showDescendantsNumbers(li.firstElementChild);
        if (count) {
            li.firstChild.data = `${li.firstChild.data} [${count}]`;
        }
        return count;
    }

    return count;
}

/** Adds numbers of descendants in non-empty list items of the list
 * 
 * @param {*} list 
 */
function showDescendantsNumbers2(list) {
    let lis = list.getElementsByTagName('li');

    for (let li of lis) {
        // get the count of all <li> below this <li>
        let descendantsCount = li.getElementsByTagName('li').length;
        if (!descendantsCount) continue;

        // add directly to the text node (append to the text)
        li.firstChild.data += ' [' + descendantsCount + ']';
    }
}

let DAYS_OF_WEEK = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
/** Creates a calendar as a table 
 * 
 * @param {HTMLElement} elem An element where to put the table with the calendar
 * @param {Number} year The year number
 * @param {Number} month 1-based (!) number of the month
 */
function createCalendar(elem, year, month) {
    // What day of the week is the first day of the given month
    // let date = new Date(year, month - 1, 1);
    let dayOfTheWeek = new Date(year, month - 1, 1).getDay();
    if (dayOfTheWeek === 0) {
        dayOfTheWeek = 7;
    }
    console.log(`day of the week : ${dayOfTheWeek}`);

    // How many days in the given month?
    let daysInMonth = new Date(year, month, 0).getDate();
    console.log(`days in the month : ${daysInMonth}`);

    // How many days should the calendar table have (minimum)
    let minimumDays = dayOfTheWeek - 1 + daysInMonth;
    console.log(`minimum days : ${minimumDays}`);

    // How many rows should the calendar table have,
    // given that it must be a multiple of 7
    let rowsNumber = Math.ceil(minimumDays / 7);
    console.log(`number of rows : ${rowsNumber}`);

    // The array which successively holds the data (strings)
    // of every cell (the days part) of the calendar
    let cellsArray = new Array(rowsNumber * 7).fill('');
    for (let index = dayOfTheWeek - 1, curDay = 1;
         index < dayOfTheWeek - 1 + daysInMonth;
         index++, curDay++) {
        cellsArray[index] = curDay;
    }
    console.log(`array of table days ${cellsArray}`);

    // Generating the table: th
    let table = document.createElement('table');
    let trh = document.createElement('tr');
    for (let index = 0; index < 7; index++) {
        let td = document.createElement('th');
        td.innerText = DAYS_OF_WEEK[index];
        trh.appendChild(td);
    }
    table.appendChild(trh);

    // Generating the table: days rows
    // The loop for rows 
    let cellCounter = 0;  // The counter for every cell in the numbers part of the table
    for (let rowIndex = 0; rowIndex < rowsNumber; rowIndex++) {
        let tr = document.createElement('tr');
        // The loop for days in the row
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            let td = document.createElement('td');
            td.innerText = cellsArray[cellCounter++];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // Assigning the table to elem
    elem.appendChild(table);

}



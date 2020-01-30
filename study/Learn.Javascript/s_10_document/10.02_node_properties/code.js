let task1 = {};

task1.scanUl = function (ul) {
    if (ul.children && ul.children.length) {
        let li = ul.firstElementChild;
        let liCount = 0;
        while (li) {
            liCount += 1 + task1.scanLi(li);
            li = li.nextElementSibling;
        }
        return liCount;
    }
};

task1.scanLi = function (li) {
    let textNode = li.firstChild;
    let liCount = 0;
    let ul = li.firstElementChild;
    if (ul) {
        liCount += task1.scanUl(ul);
    }
    console.log(`text: ${textNode.data.trim()}; nested count: ${liCount}`);
    return liCount;
};


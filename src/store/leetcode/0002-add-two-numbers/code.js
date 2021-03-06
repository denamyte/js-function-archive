function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
    let getVal = node => node ? node.val : 0;
    let getNext = node => node ? node.next : null;
    let add = (l1, l2, one) => {
        let sum = getVal(l1) + getVal(l2) + one;
        let next1 = getNext(l1),
            next2 = getNext(l2);
        let isNext = next1 || next2 || sum >= 10;
        return new ListNode(
            sum % 10,
            isNext ?
                add(next1, next2, Math.floor(sum / 10))
                : null);
    };
    return add(l1, l2, 0);
};

module.exports = {
    ListNode, addTwoNumbers
};
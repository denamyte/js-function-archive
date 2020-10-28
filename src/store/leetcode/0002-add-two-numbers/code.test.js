const {addTwoNumbers, ListNode} = require("./code");

describe('check #2 (add-two-numbers) Leetcode problem', function () {
    it('should return [7,0,8] if adds [2,4,3] and [5,6,4]', function () {
        const first = new ListNode(2, new ListNode(4, new ListNode(3, null)));
        const second = new ListNode(5, new ListNode(6, new ListNode(4, null)));
        const result = new ListNode(7, new ListNode(0, new ListNode(8, null)));
        expect(addTwoNumbers(first, second)).toEqual(result);
    });
    it('should return [0] if adds [0] and [0]', function () {
        const first = new ListNode(0, null);
        expect(addTwoNumbers(first, first)).toEqual(first);
    });
    it('should return [8,9,9,9,0,0,0,1] if adds [9,9,9,9,9,9,9] and [9,9,9,9]', function () {
        const first = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, null)))))));
        const second = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, null))));
        const result = new ListNode(8, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1))))))));
        expect(addTwoNumbers(first, second)).toEqual(result);
    });
});

function isPalindrome(word) {
    for (let i = 0; i < word.length / 2; i++) {
        if (word[i] !== word[word.length - i - 1]) {
            return false;
        }
    }
    return true;
}

let testInputs = ['', 'a', 'ab', 'abb', 'aba', 'abba'];
testInputs.forEach((testInput) => console.log(isPalindrome(testInput)))
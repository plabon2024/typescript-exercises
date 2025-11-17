// ** Problem 1 

type TProblem1 = string | number | boolean
function formatValue(x: TProblem1): TProblem1 {
    if (typeof x === "string") {
        return x.toUpperCase()
    } else if (typeof x === "number") {
        return x * 10
    } else if (typeof x === "boolean") {
        return !x
    } else {
        return x
    }

}
console.log(formatValue("hello"));
console.log(formatValue(5));
console.log(formatValue(true));


// ** Problem 2

type TProblem2 = string | unknown[]
function getLength(x: TProblem2): number {
    if (typeof x === 'string') {
        return x.length
    } else if (Array.isArray(x)) {
        return x.length
    } else {
        return 0
    }

}

console.log(getLength('typescript'));
console.log(getLength([10, 20, 30, 40]));


// ** Problem 3

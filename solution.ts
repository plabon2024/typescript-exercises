// ** Problem 1

type TProblem1 = string | number | boolean;
function formatValue(x: TProblem1): TProblem1 {
    if (typeof x === "string") {
        return x.toUpperCase();
    } else if (typeof x === "number") {
        return x * 10;
    } else if (typeof x === "boolean") {
        return !x;
    } else {
        return x;
    }
}
console.log(formatValue("hello"));
console.log(formatValue(5));
console.log(formatValue(true));

// ** Problem 2

type TProblem2 = string | unknown[];
function getLength(x: TProblem2): number {
    if (typeof x === "string") {
        return x.length;
    } else if (Array.isArray(x)) {
        return x.length;
    } else {
        return 0;
    }
}

console.log(getLength("typescript"));
console.log(getLength([10, 20, 30, 40]));

// ** Problem 3
class Person{
    constructor(public name: string, public age: number){}
    getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}
const person1 = new Person('John Doe', 30);
console.log(person1.getDetails());

const person2 = new Person('Alice', 25);
console.log(person2.getDetails());

// ** Problem 4
interface TBook{
    title:string;
    rating:number;
}
function filterByRating(books:TBook[]):TBook[]{
    return books.filter((book)=>book.rating>=4)

}
const books = [
  { title: 'Book A', rating: 4.5 },
  { title: 'Book B', rating: 3.2 },
  { title: 'Book C', rating: 5.0 },
];
console.log(filterByRating(books));
// ** Problem 5
interface TUser{
    name:string;
    email:string;
    isActive:boolean;
}
function filterActiveUsers(users:TUser[]):TUser[]{
    return users.filter((user) => user.isActive);

}const users = [
  { id: 1, name: 'Rakib', email: 'rakib@example.com', isActive: true },
  { id: 2, name: 'Asha', email: 'asha@example.com', isActive: false },
  { id: 3, name: 'Rumi', email: 'rumi@example.com', isActive: true },
];

console.log(filterActiveUsers(users));

// ** Problem 6
interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}
function printBookDetails(book: Book):void {
    console.log(`Title: ${book.title}, Author:${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable?"Yes":"No"}`)
}
const myBook: Book = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  publishedYear: 1925,
  isAvailable: true,
};

printBookDetails(myBook);
// ** Problem 7
type TArray = (string | number)[];
function getUniqueValues(array1: TArray, array2: TArray): TArray {
    const uniqueArray: TArray = [];
    function addUniqueValues(source: TArray): void {
        for (let i = 0; i < source.length; i++) {
            const value = source[i];
            if (value === undefined) {
                continue;
            }

            let exists = false;

            for (let j = 0; j < uniqueArray.length; j++) {
                if (uniqueArray[j] === value) {
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                uniqueArray[uniqueArray.length] = value;
            }
        }
    }

    addUniqueValues(array1);
    addUniqueValues(array2);

    return uniqueArray;
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(getUniqueValues(array1, array2));

// ** Problem 8
interface TProduct {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

function calculateTotalPrice(products: TProduct[]) {

    if (products.length !== 0) {
        return products.map((p) => {
            const base = p.price * p.quantity;
            const discountFactor = p.discount ? (1 - p.discount / 100) : 1;
            return base * discountFactor;
        }).reduce((sum, value) => sum + value, 0)
    } else {
        return 0;
    }
}

const products = [
    { name: 'Pen', price: 10, quantity: 2 },
    { name: 'Notebook', price: 25, quantity: 3, discount: 10 },
    { name: 'Bag', price: 50, quantity: 1, discount: 20 },
];

console.log(calculateTotalPrice(products));

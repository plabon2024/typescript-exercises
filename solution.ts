

type TValue = string | number | boolean;
function formatValue(x: TValue): TValue {
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




class Person{
    constructor(public name: string, public age: number){}
    getDetails() {
    return `'Name: ${this.name}, Age: ${this.age}'`;
  }
}


interface TBook{
    title:string;
    rating:number;
}
function filterByRating(books:TBook[]):TBook[]{
    return books.filter((book)=>book.rating>=4)

}




interface TUser{
    name:string;
    email:string;
    isActive:boolean;
}
function filterActiveUsers(users:TUser[]):TUser[]{
    return users.filter((user) => user.isActive);

}




interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}
function printBookDetails(book: Book):void {
    console.log(`Title: ${book.title}, Author:${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable?"Yes":"No"}`)
}



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



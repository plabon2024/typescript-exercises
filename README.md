
# ১) TypeScript এ `interface` আর `type` এর মধ্যে পার্থক্য কী?

TypeScript শিখতে গেলে প্রথম দিকে একটা কনফিউশন প্রায় সবাই ফেস করে: `interface` ব্যবহার করব নাকি `type`? দুটোই দেখতে অনেকটা একই রকম, আবার কিছু জায়গায় আচরণ আলাদা।

### ১.১. বেসিক কাজ – অনেক ক্ষেত্রে দুটোই একই

অনেক সাধারণ ক্ষেত্রে `interface` আর `type` একদম একই কাজ করতে পারে।

```ts
interface User {
  id: number;
  name: string;
}

type UserType = {
  id: number;
  name: string;
};
```

দুইভাবেই আপনি `User` / `UserType` দিয়ে অবজেক্ট টাইপ ডিফাইন করতে পারেন:

```ts
const user1: User = {
  id: 1,
  name: "Alice",
};

const user2: UserType = {
  id: 2,
  name: "Bob",
};
```

এখানে প্র্যাকটিক্যালি কোনো পার্থক্য নেই।

---

### ১.২. `interface` – extension (inheritance) ফ্রেন্ডলি

`interface` মূলত অবজেক্টের কনট্র্যাক্ট/শেপ ডিফাইন করার জন্য ডিজাইন করা। একে সহজে extend করা যায়।

```ts
interface BaseUser {
  id: number;
  name: string;
}

interface AdminUser extends BaseUser {
  role: "admin";
}

const admin: AdminUser = {
  id: 1,
  name: "Root",
  role: "admin",
};
```

`type` দিয়েও আমরা intersection ব্যবহার করে inheritance-এর মতো কাজ করতে পারি, তবে সেটা একটু অন্যরকম সিনট্যাক্স:

```ts
type BaseUserType = {
  id: number;
  name: string;
};

type AdminUserType = BaseUserType & {
  role: "admin";
};

const admin2: AdminUserType = {
  id: 2,
  name: "Superuser",
  role: "admin",
};
```

দুইটাতেই কাজ হবে, তবে অবজেক্ট মডেলিং, API রেসপন্স ইত্যাদিতে অনেকেই `interface` পছন্দ করেন, কারণ `extends`-এর সিনট্যাক্সটা ক্লিন এবং অবজেক্ট-ওরিয়েন্টেড চিন্তার সাথে মেলে।

---

### ১.৩. Declaration merging – শুধু `interface` এ

এটা একটা বড় পার্থক্য।

`interface` একাধিকবার ডিফাইন করলে TypeScript এগুলোকে merge করে ফেলে, মানে একই নামের interface-এ নতুন প্রপার্টি অ্যাড করা যায়। এটা অনেক লাইব্রেরি বা থার্ড-পার্টি টাইপ ডেিফনিশন কাস্টমাইজ করতে কাজে লাগে।

```ts
interface AppConfig {
  appName: string;
}

// পরের কোথাও আবার…
interface AppConfig {
  version: string;
}

const config: AppConfig = {
  appName: "My App",
  version: "1.0.0",
};
```

এখানে দুইটা ডিক্লারেশন merge হয়ে গেছে।

`type` এর ক্ষেত্রে এটা সম্ভব না:

```ts
type AppConfigType = {
  appName: string;
};

// আবার একই নামে type ডিফাইন করলে এরর:
type AppConfigType = {
  version: string;
};
// Error: Duplicate identifier 'AppConfigType'
```

তাই যেসব ক্ষেত্রে আপনি চান একটা টাইপকে পরে extend বা augment করতে (বিশেষ করে লাইব্রেরি কাস্টমাইজেশন, global টাইপ ইত্যাদি), সেখানে `interface` ভালো।

---

### ১.৪. `type` – আরও বেশি ফ্লেক্সিবল / কম্পোজেবল

`type` শুধু অবজেক্ট শেপের জন্য না, আরও অনেক কিছুর জন্য ব্যবহার করা যায়:

* union টাইপ
* primitive alias
* mapped types, conditional types ইত্যাদি কম্বাইন করা

```ts
type ID = string | number;

type Status = "active" | "inactive" | "blocked";

type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

`interface` দিয়ে আপনি union টাইপ বা string literal union সরাসরি করতে পারবেন না। তাই যখন আপনাকে খুব জটিল, কম্পোজেবল টাইপ সিস্টেম বানাতে হবে, সেখানে `type` অনেক সুবিধাজনক।

---

### ১.৫. কখন কোনটা ব্যবহার করবেন (প্র্যাক্টিক্যাল গাইডলাইন)

একটা কাজে লাগার মতো thumb rule:

* **অবজেক্ট / ক্লাস / API response-এর শেপ ডিফাইন করতে** ⇒ `interface` (বিশেষ করে যদি extend বা merge করার দরকার পড়তে পারে)
* **Union, প্রিমিটিভ alias, utility type, জটিল টাইপ কম্পোজিশন** ⇒ `type`
* যদি খুব ছোট প্রোজেক্ট/ডেমো হয়, একটাই ব্যবহার করলেও সমস্যা নেই। তবে বড় কোডবেসে consistency বজায় রাখার জন্য সাধারণত টিম একটা convention ঠিক করে।

---

# ২) TypeScript এ `any`, `unknown`, আর `never` টাইপের পার্থক্য

এই তিনটা টাইপ TypeScript-এর টাইপ সেফটির উপর অনেক বড় প্রভাব ফেলে। ভুলভাবে ব্যবহার করলে টাইপ সিস্টেমের সুবিধা নষ্ট হয়ে যায়, আর সঠিকভাবে ব্যবহার করলে অনেক বাগ আগেই ধরা যায়।

---

### ২.১. `any` – “টাইপ চেক বন্ধ করে দাও”

`any` মানে TypeScript কে বলা: “এটার টাইপ নিয়ে চিন্তা করো না, যা খুশি হতে পারে।” এটা খুব শক্তিশালী, কিন্তু খুবই ডেঞ্জারাস।

```ts
let value: any;

value = 42;
value = "hello";
value = { x: 10 };

value.toUpperCase();    // টাইপস্ক্রিপ্ট কোনো অভিযোগ করে না
value.foo.bar.baz();    // এটাও ঠিক আছে বলে ধরে নেয় (runtime এ ক্র্যাশ হতে পারে)
```

* Pros: দ্রুত প্রোটোটাইপ, অজানা third-party কোড, ধীরে ধীরে টাইপিং আনতে সুবিধা।
* Cons: টাইপ সেফটি ধ্বংস হয়ে যায়; আসলে JavaScript-এ ফিরে যাওয়া।

প্র্যাক্টিক্যাল টিপ:
`any` যত কম ব্যবহার করবেন, আপনার কোড তত কম runtime বাগ ধরবে।

---

### ২.২. `unknown` – “কী সেটা জানি না, আগে চেক কর”

`unknown` হলো নিরাপদ `any`।
আপনি যেকোনো ভ্যালু `unknown` এ রাখতে পারেন, কিন্তু `unknown` ভ্যারিয়েবল ব্যবহার করার আগে টাইপ চেক বা narrowing করতে হবে।

```ts
let input: unknown;

input = 10;
input = "test";
input = { name: "Alice" };

// সরাসরি ব্যবহার করতে গেলেই এরর:
input.toUpperCase(); 
// Error: Object is of type 'unknown'.

// আগে টাইপ চেক করলে:
if (typeof input === "string") {
  console.log(input.toUpperCase()); // এখন ঠিক আছে
}

if (typeof input === "number") {
  console.log(input.toFixed(2)); // এখন ঠিক আছে
}
```

`unknown` ব্যবহার করার ভালো জায়গা:

* API থেকে আসা ডাটা, যেটা আগে ভ্যালিডেট করবেন
* `JSON.parse` এর রিটার্ন টাইপ
* লাইব্রেরি বা utility ফাংশনের generalized ইনপুট, যেটা আপনি পরে চেক করবেন

```ts
function parseJson(json: string): unknown {
  return JSON.parse(json);
}

const data = parseJson('{"name": "Alice"}');

if (typeof data === "object" && data !== null && "name" in data) {
  // এখন data কে আরও নির্দিষ্ট টাইপে কাস্ট/ন্যারো করতে পারেন
}
```

---

### ২.৩. `never` – “এখানে আসার কথা না”

`never` টাইপটা এমন ভ্যালু বোঝায় যেটা কখনোই ঘটে না। সাধারণত দুইভাবে পাওয়া যায়:

1. এমন ফাংশন থেকে, যেগুলো কখনো রিটার্ন করে না (যেমন সবসময় error থ্রো করে বা ইন্টার্নাল লুপে থাকে)
2. `switch` বা conditional টাইপে “unreachable” কেসগুলা চেক করতে

#### উদাহরণ: কখনো রিটার্ন করে না

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

এখানে TypeScript জানে, `fail` কখনো কোনো ভ্যালু রিটার্ন করবে না।

#### উদাহরণ: exhaustive checking

ধরুন একটা union টাইপ আছে:

```ts
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };
```

এখন আমরা `kind` দেখে আলাদা আলাদা ভাবে handle করব:

```ts
function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.size * shape.size;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

এখানে `default` কেসে আমরা `shape` কে `never` টাইপ হিসেবে ধরে নিচ্ছি।
যদি ভবিষ্যতে আমরা নতুন একটা shape যোগ করি:

```ts
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "triangle"; base: number; height: number };
```

তখন `area` ফাংশনে `triangle` কেস handle না করলে TypeScript `never` assignment-এ এরর দেবে।
এর ফলে আপনি কোনো কেস ভুলে গেলেন কিনা সেটা টাইপস্ক্রিপ্ট নিজে থেকেই ধরে ফেলবে।




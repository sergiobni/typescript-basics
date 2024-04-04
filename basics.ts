//Basic primitives
let use: string;
//user = 33;
use = 'lol';

let userAge = 3;

let isValid = true;

//Invoking typescript compiler
// npx tsc .\first-app.ts

//Combining types
let userID: string | number = 'acb1';
userID = 123;

//Working with object types

//let user: object; Not correct this way if we want to avoid empty or different objects
//Defining entire object type
let user: {
  name: string;
  age: number;
  isAdmin: boolean;
  id: string | number;
};

user = {
  name: 'Sergio',
  age: 22,
  isAdmin: true,
  id: 'abc',
};

//Array types
let hobbies: Array<string>;
//let hobbies: string[] same thing

hobbies = ['sports', 'cooking', 'reading'];
//hobbies = [1,3,5]

//Types to functions

//void if function doesn't return anything
function add(a: number, b: number) {
  const result = a + b;
  return result;
}

//custom types to outsource definitions
type AddFn = (a: number, b: number) => number;

function calculate(
  a: number,
  b: number,
  calcFn: AddFn //(a: number, b: number) => number
) {
  calcFn(a, b);
}

calculate(2, 5, add);

//Defining object types with interfaces
interface Credentials {
  password: string;
  email: string;
}

let creds: Credentials;

creds = {
  password: 'abc',
  email: 'peop',
};

//interface vs custom types
//in general we can always use type keyword
//interface is limited to object types, and function types but won't be able to use union types

//Example of interface used to force the whole properties into when used.
class AuthCredentials implements Credentials {
  email: string;
  password: string;
}

//function receiving credentials of type credentials
function login(credentials: Credentials) {}
//we can call it using the credentials types we created earlier
login(creds);
login(new AuthCredentials());

//We can extend interface, redifining the same interface with the same name
// interface Credentials {
//   mode: string;
// }

//Merging types

//With type keyworkd

type Admin = {
  permissions: string[];
};

type AppUser = {
  userName: string;
};

//Combination of the two types
type AppAdmin = Admin & AppUser;

let admin: AppAdmin;

admin = {
  permissions: ['login'],
  userName: 'sergio',
};

//With interface keyword

interface AdminI {
  permissions: string[];
}

interface AppUserI {
  userName: string;
}

interface AppAdminI extends AdminI, AppUserI {}

let adminI: AppAdminI;

adminI = {
  permissions: ['login'],
  userName: 'sergio',
};

///Literal types
//Only use specific values
type Role = 'admin' | 'user' | 'editor';
let role: Role;

///Type guards
function performAction(action: string, role: Role) {
  if (role === 'admin' && typeof action === 'string') {
    //..
  }
}

//Generic types
let roles: Array<Role>;
roles = ['admin', 'editor'];

type DataStorage<T> = {
  storage: T[]; //Array full of generic types
  add: (data: T) => void; //method getting generic type
};

//Example using string type
const textStorage: DataStorage<string> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

//generic function
function merge<T, U>(a: T, b: U) {
  return {
    ...a,
    ...b,
  };
}

const newUser = merge<{ name: string }, { age: number }>(
  { name: 'Sergio' },
  { age: 11 }
);

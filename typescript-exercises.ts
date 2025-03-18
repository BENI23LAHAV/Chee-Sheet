//===========================================
// TypeScript Final Exercises
// by Simcha Berkowitz
//===========================================

// ==========================================
// Basic Types
// ==========================================

//union type
type primitiveTypes = number | string | boolean;
//arrays
const arr: number[] = [1, 2, 3];
const strArr: string[] = ["a", "b", "c"];
//tuples
let person: [string, number] = ["Alice", 25];
//unique Types
type uniqueTypes = {
  any: any;
  unknown: unknown;
};

// ==========================================
//Interfaces & Type Aliases
// ==========================================

interface BaseUser {
  name: string;
  id: number;
  printUser: () => void;
}
class MyUser implements BaseUser {
  constructor(public name: string, public id: number) {}
  printUser = () => {
    console.log(`User: ${this.name}, ID: ${this.id}`);
  };
}

//type aliases
type admin = {
  isAdmin: boolean;
};
//type assertions
type superAdmin = BaseUser & admin;

// ==========================================
// Functions
// ==========================================

function add(param1: number, param2: number): number {
  return param1 + param2;
}

//function with optional and default parameters
function example(
  requiredParam: number,
  defaultParm: number = 0,
  optionalParm?: number
): number {
  return requiredParam + defaultParm + (optionalParm || 0);
}

//===========function overload===========================

//1. Writing multiple signatures
function log(message: string): void;
function log(error: Error): void;
function log(message: string, error: Error): void;

//2. Writing an implementation
function log(param1: string | Error, param2?: Error): void {
  if (typeof param1 === "string" && param2 instanceof Error) {
    console.error(`Error: ${param1}`, param2);
  } else if (param1 instanceof Error) {
    console.error(param1);
  } else {
    console.log(param1);
  }
}

// ==========================================
// Utility Types
// ==========================================
interface User {
  name: string;
  age: number;
  isAdmin?: boolean;
}
//partial
const partialUser: Partial<User> = { name: "Alice" };
//required - makes all properties required
const requiredUser: Required<User> = { name: "Alice", age: 30, isAdmin: true };
//readonly - makes all properties readonly
const readonlyUser: Readonly<User> = { name: "Alice", age: 30, isAdmin: true };
//pick - creates a new type with only the specified properties
const pickedUser: Pick<User, "name" | "age"> = { name: "Alice", age: 30 };
//omit - creates a new type without the specified properties
const omittedUser: Omit<User, "isAdmin"> = { name: "Alice", age: 30 };
//record - creates an object type with the specified keys and value type
const recordUser: Record<keyof User, string> = {
  name: "Alice",
  age: "30",
  isAdmin: "true",
};

type AvailableDrinks = "Coffee" | "Tea" | "Water" | "Soda";
//Exclude - creates a new type excluding the specified values
type NonCaffeinated = Exclude<AvailableDrinks, "Coffee" | "Tea">; // "Water" | "Soda"

//Extract - creates a new type with only the specified values
type Caffeinated = Extract<AvailableDrinks, "Coffee" | "Tea">; // "Coffee" | "Tea"

// ==========================================
// Generics
// ==========================================

//generic function
function firstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

//generic interface
interface genericInterface<K, V> {
  key: K;
  value: V;
}
let pair: genericInterface<string, number> = { key: "age", value: 30 };
//generic class
class genericClass<T> {
  constructor(public item: T) {}
}

//constraints is way to limited the generic.
function constraintsFunction<T extends { length: number }>(obj: T): void {
  console.log(obj.length);
}
function getProperty<Type, Key extends keyof Type>(
  obj: Type,
  key: Key
): Type[Key] {
  return obj[key];
}
// ==========================================
// Advanced Types
// ==========================================

// mapped types
type Stringified<T> = {
  [K in keyof T]: string;
}; //Converts all types to string

//conditional types
type conditionalType<T> = T extends null | undefined ? never : T; //filter null and undefined

// ==========================================
// Type Guards
// ==========================================
namespace TypeGuards {
  function isString(value: number | string): value is string {
    return typeof (value as string) === "string";
  }
  function hasKey<T extends object>(obj: T, key: keyof T): boolean {
    return key in obj;
  }
  type User = { name: string; age: number };
  type Admin = User & { isAdmin: true };
  type Guest = { guestId: string };

  type Person = User | Admin | Guest;

  // Advanced Type Guard
  function isType<T extends object, K extends keyof T>(
    obj: any,
    key: K
  ): obj is T {
    return key in obj;
  }
  function printInfo(person: Person) {
    if (isType<Admin, "isAdmin">(person, "isAdmin")) {
      console.log(`Admin: ${person.name}, Age: ${person.age}`);
    } else if (isType<Guest, "guestId">(person, "guestId")) {
      console.log(`Guest ID: ${person.guestId}`);
    } else {
      console.log(`User: ${person.name}, Age: ${person.age}`);
    }
  }
}

// ==========================================
// Decorators
// ==========================================

// Class decorator
function AddTimestamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    timestamp = new Date();
  };
}
// Property decorator
function LogAccess(target: any, context: ClassFieldDecoratorContext) {
  console.log(`Property ${String(context.name)} was accessed`);
}
// Method decorator
function MeasureTime(target: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  return function (this: any, ...args: any[]) {
    const start = performance.now();
    const result = target.call(this, ...args);
    const end = performance.now();
    console.log(`${methodName} took ${end - start}ms`);
    return result;
  };
}

@AddTimestamp
class SimpleExample {
  @LogAccess
  public name: string = "example";

  @MeasureTime
  calculate(x: number, y: number): number {
    return x + y;
  }
}

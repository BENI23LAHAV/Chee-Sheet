/**----------Welcome to CheatSheet---------- */

/**---------- Basic Types -----------*/
let a: number = 2;
let b: boolean = true;
let c: string = "some";
let d: null = null;
let e: undefined = undefined;
const f: Function = () => {};
const g: string[] = ["First", "Second"];

/**----------Advanced Types---------- */
const h: bigint = 1n | BigInt(1);
const i: symbol = Symbol("some");
type j = { name: string; res: typeof l } | object;
const k: j = { name: "name" };
const l: unknown = "some";
let m: any = "some";
m = { name: "name" };
m = () => {};
const n: never = (() => {
  throw new Error("some");
})(); //never type is used for case when yo ugetting situation that will never happen

type UserKeys = keyof User; // "name" | "age" | "role" | "email"
type UserRole = User["role"]; // Role Enum

/**----------Tuples & Readonly---------- */

const tuple: readonly [number, string, object] = [1, "some", { some: "some" }];

/**----------Type Unions---------- */
type color = "red" | "blue" | "green" | "orange";
type rgbColor = `rgb(${number}, ${number}, ${number})`;
type hexColor = `#${string}`;
type generalColor = color | rgbColor | hexColor;
type shape = "circle" | "square" | "rectangle";
type screenShape = {
  shape: shape;
  color: generalColor;
};

/**---------- Type Assertions---------- */
function response(res: unknown | undefined): void {
  switch (typeof res) {
    case "number":
      console.log((res as number) + 1);
      break;
    case "string":
      console.log(res);
      break;
    case "undefined":
      console.log("undefined");
      break;
    default:
      console.log("Type didn't support");
  }
}

/**----------Enums---------- */
enum Role {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}
enum steps {
  First, //defult value is 0
  Second, //defult value is 1 increase by 1
  Third, //defult value is 2 increase by 1
}
console.log(Role.Admin, Role["User"], steps.Second);

/**----------Interfaces---------- */

interface Person {
  name: string;
  age: number;
}

interface User extends Person {
  role: Role;
  email?: string;
}
/**----------Utility Types---------- */
const guest: Partial<User> = {
  role: Role.Guest,
}; //Used for make optional properties

const regularUser: User = {
  name: "user",
  age: 20,
  role: Role.User,
};

const admin: Required<Omit<User, "age"> & { email?: string }> = {
  name: "admin",
  role: Role.Admin,
  email: "a@a.com",
}; // Used for make required properties
const obj: Record<string, number> = { a: 1, b: 2, c: 3 }; //Used for define object key and value type
const tuple2: ReadonlyArray<number | string | object> = [
  1,
  "some",
  { some: "some" },
];
type PickUser = Pick<User, "name" | "age">; //Will return name and age, Used for pick properties
type ExtractColor = Extract<color, "red" | "blue">; //Will return red and blue, Used for extract properties
type ExcludeColor = Exclude<color, "red" | "blue">; //Will return green and orange, Used for exclude properties

type AsyncType = Promise<color>;
type Result = Awaited<AsyncType>; //Will return color

/**----------Type Aliases---------- */
type greetType = `Hello ${User["name"]}`; //Will return "Hello user" only if name is user type
type greet = greetType | `Hello ${string}`; //Will return "Hello user" or "Hello string"

/**----------Generics & Mapping---------- */
type flexType<T> = {
  +readonly [K in keyof T]?: T[K];
};
type IsString<T> = T extends string ? "Yes" : "No";
type Test = IsString<number>; // Will return No

/**----------Decorators---------- */
function Logger(contractor: Function): void {
  console.log(contractor);
}
function MethodDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(" Method Decorator: ", propertyKey, descriptor.value);
}
/**----------Abstract Classes---------- */
@Logger
abstract class JWT {
  protected constructor(protected jwt: string) {}
}
/**----------Classes---------- */
@Logger
class JWToken extends JWT {
  constructor(public user: User, private secretKey: string) {
    super(JSON.stringify(user) + secretKey);
  }
  @MethodDecorator
  getJWT(): string {
    return this.jwt;
  }
}
/**----------Namespaces---------- */
namespace App {
  export class User {
    constructor(public name: string) {}
  }
}
console.log(new App.User("user").name);
/**----------Advanced Object---------- */
const objectKeysArray = Object.keys(obj);
const objectValuesArray = Object.values(obj);
const objectEntriesArray = Object.entries(obj);
const objectFromEntriesArray = Object.fromEntries(objectEntriesArray);

/**----------Keyword---------- */
type GetArrayElementType<T> = T extends (infer U)[] ? U : never;
type NumberType = GetArrayElementType<number[]>;
type StringType = GetArrayElementType<string[]>;

/**----------Type Guards---------- */
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
function isPerson(value: unknown): value is Person {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value &&
    typeof (value as Person).name === "string" &&
    typeof (value as Person).age === "number"
  );
}

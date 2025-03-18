//===========================================
// TypeScript Final Exercises
// by Beni Lahav & Simcha Berkowitz 2025©️
//===========================================
/**---------- Basic Types -----------*/
type basicTypes =
  | number
  | string
  | boolean
  | undefined
  | null
  | Function
  | object;

/**----------Advanced Types---------- */
const bigint: bigint = 1n | BigInt(1);
const symbol: symbol = Symbol("some"); //Symbol("some") !== Symbol("some")

let anyType: any = "some"; //Don't use this ever!!!!!!
anyType = { name: "name" };
anyType = () => {};

//never type example
type conditionalType<T> = T extends null | undefined ? never : T; //filter null and undefined

type UserKeys = keyof User; // "name" | "age" | "role" | "email"

type UserRole = User["role"]; // Role is type of Enum

/**----------Tuples & Readonly---------- */

const tuple: readonly [number, string, object] = [1, "some", { some: "some" }];

/**----------Type Unions & Literals---------- */
type colorUnion = "red" | "blue" | "green" | "orange";
//Type literals
type rgbColor = `rgb(${number}, ${number}, ${number})`;
type hexColor = `#${string}`;
//union of types
type generalColorUnion = colorUnion | rgbColor | hexColor;
type shapeUnion = "circle" | "square" | "rectangle";
type screenShape = {
  shape: shapeUnion;
  color: generalColorUnion;
};

/**---------- Handle unknown types---------- */
function unknownResponse(res: unknown): void {
  if (typeof res === "number") {
    console.log((res as number) + 1);
  } else if (typeof res === "string") {
  } else {
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

/**----------Functions---------- */
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

/**----------Function overload---------- */
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

/**----------Interfaces---------- */
interface Person {
  name: string;
  age: number;
}

interface User extends Person {
  role: Role;
  email?: string;
}
interface JWTinterface {
  print(): void;
}

/**----------Utility Types---------- */
const readonlyUser: Readonly<Partial<User>> = { name: "Alice" };

const admin: Required<Omit<User, "age"> & { email: string }> = {
  name: "admin",
  role: Role.Admin,
  email: "a@a.com",
}; // Used for make required properties

type PickUser = Pick<User, "name" | "age">; //Will return name and age, Used for pick properties
type ExtractColor = Extract<colorUnion, "red" | "blue">; //Will return red and blue, Used for extract properties
type ExcludeColor = Exclude<colorUnion, "red" | "blue">; //Will return green and orange, Used for exclude properties
type AsyncType = Promise<colorUnion>;
type Result = Awaited<AsyncType>; //Will return colorUnion

/**----------Type Guards---------- */
function isString(value: unknown): value is string {
  return typeof (value as string) === "string";
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

/**----------Generics & Mapping---------- */
type flexType<T> = {
  -readonly [K in keyof T]+?: T[K];
};
type IsString<T> = T extends string ? "Yes" : "No";
type Test = IsString<number>; // Will return No

/**----------Abstract Classe---------- */
@ClassDecorator
abstract class JWT {
  protected constructor(protected jwt: string) {}
}
/**----------Classes---------- */
@ClassDecorator
class JWToken extends JWT implements JWTinterface {
  constructor(public user: User, private secretKey: string) {
    super(JSON.stringify(user) + secretKey);
  }

  @AccessDecorator
  getJWT(): string {
    return this.jwt;
  }
  setJWT(@ParameterDecorator jwt: string) {
    this.jwt = jwt;
  }
  @MethodDecorator
  print(): void {
    console.log(this.getJWT());
  }
}

/**----------Decorators---------- */
function ClassDecorator(constructor: Function) {
  console.log("5: Class Decorator ", constructor.name);
} //Class Decorator , applied to class

function PropertyDecorator(target: any, propertyKey: string) {
  console.log("1: Property Decorator:", propertyKey);
} //Property Decorator , applied to property

function MethodDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("3: Method Decorator:", propertyKey);
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Im ${propertyKey}`);
    return original.apply(this, args);
  };
} //Method Decorator , applied to method

function ParameterDecorator(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log("2:  Parameter Decorator:", propertyKey, parameterIndex);
} //Parameter Decorator , applied to parameter

function AccessDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("4: Access Decorator:", propertyKey);
} //Access Decorator , applied to access
console.log(new App.User("user").name);
/**----------Advanced Object---------- */
const objectKeysArray = Object.keys(obj);
const objectValuesArray = Object.values(obj);
const objectEntriesArray = Object.entries(obj);
const objectFromEntriesArray = Object.fromEntries(objectEntriesArray);

/**----------Infer---------- */
type GetArrayElementType<T> = T extends (infer U)[] ? U : never;
type NumberType = GetArrayElementType<number[]>;
type StringType = GetArrayElementType<string[]>;

/**----------Namespaces---------- */
namespace App {
  export class User {
    constructor(public name: string) {}
  }
}

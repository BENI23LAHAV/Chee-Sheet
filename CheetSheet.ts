/**----------Welcome to CheatSheet---------- */

/**---------- Basic Types -----------*/
let a: number = 2;
let b: boolean = true;
let c: string = "some";
let d: null = null;
let e: undefined = undefined;
const f: Function = () => {};
const g: string[] = ["First", "Second"];

/**----------Tuples---------- */

const tuple: readonly [number, string, object] = [1, "some", { some: "some" }];

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
console.log(Role.Admin, Role["User"]);

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
};

const regularUser: User = {
  name: "user",
  age: 20,
  role: Role.User,
};

const admin: Required<Omit<User, "age"> & { email?: string }> = {
  name: "admin",
  role: Role.Admin,
  email: "a@a.com",
};
/**----------Type Aliases---------- */
type greetType = `Hello ${User["name"]}`;

/**----------Generics & Mapping---------- */
type flexType<T> = {
  +readonly [K in keyof T]?: T[K];
};
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

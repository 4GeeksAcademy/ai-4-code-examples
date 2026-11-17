/*
 * Types declaration file
 * A place you can put all the data types for your project. 
 */

//  TS Types let you group datatypes and/or literals (specific values.)
type TypeName = string | number | boolean | "literal values" | 10000 | false;
type NullishType = null | undefined;
type FalsyType = NullishType | false | "" | 0 | 0n | 0.0 | -0;
type IntegerType = number; // This doesn't enforce a variable being an int, but it makes it more readable.
const something: any = "Any is a code smell, it isn't necessarily going to break things, it makes your code harder to read."

// Interfaces
interface ISomeInterface {
    key: "value";
    some_num: IntegerType;
    some_func: () => void;
}

interface IProduct {
    sku: string;
    width: number;
    height: number;
    length: number;
    flat_ship_svcs: IService[];
}

interface IService {
    carrier: string;
    service_name: string;
    width: number;
    length: number;
}

interface IUser {
    id: IntegerType;
    username: string;
    password: string;
    is_active: boolean;
    property: ISomeInterface;
    // and so on;
}

/**
 * Data relations
 * There are 3 types of data relationships, 1 to 1, 1 to many, and many to many.
 */

interface IFurniture {
    name: string;
}

interface IPerson {
    name: string;
    favorite_pet: IPet;
    pets: IPet[];
}

interface IPet {
    name: string;
    favorite_nap_spot: IFurniture;
}

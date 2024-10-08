declare global {
    namespace TSB {
        export interface AppDomain {
            resolve(module: string): Promise<Record<string, any>>;

            loadBundle(path: string): Promise<void>

            isPrimaryDomain(): boolean;

            createDomain(): AppDomain;
        }

        type NonNullableNonVoid<T> = NonNullable<T> extends void ? never : NonNullable<T>;

        /**
         * A type representing a function (macro) that takes arguments of type `TArg` and returns a non-nullable, non-void value of type `TRet`.
         *
         * `ExpressionMacro` is valid in an expression context, ensuring that the returned value is always defined and non-void.
         *
         * @template TArg - A tuple representing the types of the arguments the function accepts.
         * @template TRet - The return type of the function. The return value cannot be `null`, `undefined`, or `void`.
         *
         * @example
         * const PI: ExpressionMacro<[], number> = () => 3.14;
         * const result = PI(); // result is of type number and is guaranteed to be non-nullable and non-void.
         */
        export type ExpressionMacro<TArg extends any[], TRet> = (...args: TArg) => NonNullableNonVoid<TRet>;

        /**
         * A type representing a function (macro) that takes arguments of type `TArg` and returns any value.
         *
         * `StatementMacro` is valid in a statement context. A value can be returned but affects only the function where it is implemented.
         *
         * @template TArg - A tuple representing the types of the arguments the function accepts.
         *
         * @example
         * const debug: StatementMacro<[string]> = (message: string) => {
         *     if (isDebug) {
         *         console.log(message);
         *     }
         * };
         *
         * debug("PI is '3.14'"); // Logs the message if debugging is enabled.
         */
        export type StatementMacro<TArg extends any[]> = (...args: TArg) => any;
    }

    const AppDomain: TSB.AppDomain;
}

declare module "tsb" {
    type TSBPlatform = "nodejs" | "browser" | string;
    type TSBPlugin = "minify" | "macro" | string;

    class Builder {
        public module(name: string): this ;

        public platform(platform: TSBPlatform): this;

        public entry(file: string): this;

        public output(folder: string): this;

        public addFiles(...files: string[]): this;

        public addFolders(...folders: string[]): this;

        public chunkSize(size: number): this;

        public embeddedFileMap(value: boolean): this;

        public plugins(...names: TSBPlugin[]): this;
    }

    export const builder: Builder;
}

export {};
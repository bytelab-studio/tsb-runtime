declare global {
    namespace TSB {
        export interface AppDomain {
            resolve(module: string): Record<string, any>;

            isPrimaryDomain(): boolean;

            createDomain(): AppDomain;
        }
    }

    const AppDomain: TSB.AppDomain;
}


export {};
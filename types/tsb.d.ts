declare module "tsb" {
    type TSBPlatform = "nodejs" | "browser" | string;
    type TSBPlugin = "minify" | string;

    class Builder {
        public module(name: string): this ;

        public platform(platform: TSBPlatform): this;

        public entry(file: string): this;

        public output(folder: string): this;

        public addFiles(...files: string[]): this;

        public addFolders(...folders: string[]): this;

        public chunkSize(size: number): this;

        public plugins(...names: TSBPlugin[]): this;
    }

    const builder: Builder;
}

export {}
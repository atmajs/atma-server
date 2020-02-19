import { glob, File } from 'atma-io';

type FileType = InstanceType<typeof File>;

export function fs_exploreFiles (mix: string): Promise<FileType[]> {
   
    return new Promise((resolve, reject) => {
        glob.readAsync(mix, (error, entries) => {
            if (error) {
                reject(error);
                return;
            }
            let files = <FileType[]> <any> entries.filter(isFile);
            resolve(files);
        })
    });
}

function isFile(f: any): f is FileType {
    return Boolean(f.uri?.extension);
}
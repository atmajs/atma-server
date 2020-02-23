import { File, env } from 'atma-io'
import { class_Uri } from 'atma-utils'
import { fs_exploreFiles } from '../util/fs'
import alot from 'alot'

export namespace HttpEndpointExplorer {
    export async function find (path: string, base?: string): Promise< { [urlPattern: string]: string } > {
        if (path == null || path === '') {
            return null;
        }
        if (path.endsWith('/')) {
            path = `${path}**Endpoint*`;
        }

        if (path.startsWith('.') || path.startsWith('/')) {
            if (base == null) {
                base = env.currentDir.toString();
            }
            path = class_Uri.combine(base, path);
        }

        let files = await fs_exploreFiles(path);
        let keyValues = await alot(files).mapAsync(async $file => {
            let file = new File($file.uri.toString(), { cached: false });
            let str = await file.readAsync <string> ({ skipHooks: true});
            let rgx = /@[\w\.]+.route\s*\(\s*['"]([^'"]+)['"]/;
            let match = rgx.exec(str);
            if (match == null) {
                return null;
            }
            let urlPattern = match[1];
            return [ `^${urlPattern}`, file.uri.toString() ];
        }).toArrayAsync({ threads: 4 })

        return alot(keyValues).toDictionary(arr => arr[0], arr => arr[1]);
    }
}
import alot from 'alot';
import * as os from 'os';

export namespace $network {
    export function getHosts (): { name: string, host: string }[] {

        let dict = os.networkInterfaces();
        let networks = alot
            .fromObject(dict)
            .mapMany(group => {
                return alot(group.value as os.NetworkInterfaceInfo[])
                    .filter(x => x.family === 'IPv4')
                    .map(x => {
                        return {
                            name: group.key,
                            host: x.address
                        };
                    })
                    .toArray()
            })
            .toArray();


        return [
            { name: 'Local', host: 'localhost' },
            ...networks
        ]
    }
}

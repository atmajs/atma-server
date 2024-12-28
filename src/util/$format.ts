export namespace $format {
    export namespace $size {
        const SIZES = {
            B: 1,
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
            TB: 1024 * 1024 * 1024 * 1024,
            PB: 1024 * 1024 * 1024 * 1024 * 1024
        }
        /**
         * @param {string} fmt 1KB 20MB 5GB
         * @returns {number} size in bytes
         */
        export function parse (fmt: number | string): number {
            if (typeof fmt === 'number') {
                // no parsing required
                return fmt;
            }
            let match = /^(?<value>[\d\.]+)(?<unit>)$/i.exec(fmt.trim());
            if (match == null) {
                throw new Error(`Invalid format: ${fmt}`);
            }
            let unitAmount = SIZES[match.groups.unit].toUpperCase();
            let amount = parseFloat(match.groups.value);
            return amount * unitAmount;
        }
    }
}

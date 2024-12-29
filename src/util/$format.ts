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
            let match = /^(?<value>[\d\.]+)(?<unit>[a-z]+)$/i.exec(fmt.trim());
            if (match == null) {
                throw new Error(`Invalid format: ${fmt}`);
            }
            if (SIZES[match.groups.unit] == null) {
                throw new Error(`Unsupported unit: ${match.groups.unit}`);
            }
            let unitAmount = SIZES[match.groups.unit];
            let amount = parseFloat(match.groups.value);
            return amount * unitAmount;
        }
    }
}

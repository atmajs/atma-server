if (typeof BigInt !== 'undefined' && 'toJSON' in BigInt.prototype === false) {
    (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    };
}

import { QueryMidd } from './query'
import { StaticMidd, createStaticMidd } from './static'

export default {
    query: QueryMidd,
    static: StaticMidd,
    files: createStaticMidd
};

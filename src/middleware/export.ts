import { BodyJsonMid } from './bodyJson';
import { QueryMid } from './query'
import { StaticMid, createStaticMid } from './static'

export default {
    query: QueryMid,
    bodyJson: BodyJsonMid,
    static: StaticMid,
    files: createStaticMid
};

import {DataRecord} from './dataRecord';

export abstract class DataCatalogue
{
    public addRecord(record: DataRecord)
    {
        throw new Error('not implemented');
    }

    public getRecord(id: number)
    {
        throw new Error('not implemented');
    }

}

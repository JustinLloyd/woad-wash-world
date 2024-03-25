// a data library keeps track of data records that have been modified or are modified from the original data record
// the data library can have multiple copies of the same data record, but each copy is a unique instance
// when adding a new data record, the entire record is copied (deep copy) from the original data record and then added to the library
import {DataRecord} from './dataRecord';

export abstract class DataLibrary<T extends DataRecord>
{
    public data: Array<T> = new Array<T>();

    public add<T extends DataRecord>(dataRecord): void
    {
        this.data.push(dataRecord.clone()); // TODO implement clone method in DataRecord class);
    }

    public removeAt(index: number): void
    {
        if (index < 0 || index >= this.data.length)
        {
            throw new Error('index out of range');
        }

        this.data.splice(index, 1);
    }

    public remove<T extends DataRecord>(dataRecord: DataRecord): void
    {
        throw new Error('not implemented');
    }

    public getAt(index: number): T
    {

        if (index < 0 || index >= this.data.length)
        {
            throw new Error('index out of range');
        }

        return this.data[index];
    }
}

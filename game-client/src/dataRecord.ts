export abstract class DataRecord
{
    public id: number;

    public clone(): DataRecord
    {
        return Object.assign({}, this);
    }
}

import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface Search  extends Document {
//AGREGAR FECHA DE CREACION
    searchType: string;
    queryOptions: {
        q: string;
        sort?: string;
        order?: string;
        per_page?: number;
        page?: number;
    }   
} 

const dataSchema: Schema<Search> = new Schema<Search>({
    searchType: { type: String, required: true },
    queryOptions: { q: { type: String, required: true }, 
                    sort: { type: String, required: false },
                    order: { type: String, required: false },
                    per_page: { type: Number, required: false },
                    page: { type: Number, required: false },
                },
});

const Search: Model<Search> = model<Search>('Busqueda', dataSchema);

export default Search;
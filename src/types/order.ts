export type Order = {
    ingredients: string[];
    _id: string;
    status: 'done' | 'pending' | 'canceled';
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}
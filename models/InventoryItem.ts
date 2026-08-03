import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryItem extends Document {
    brand: string;
    productName: string;
    quanity: number;
    isPerishable: boolean;
    expirationDate?: Date;
}

const InventoryItemSchema: Schema = new Schema({
    brand: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    isPerishable: { type: Boolean, required: true },
    expirationDate: {type: Date, required: false}
});

export default mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);
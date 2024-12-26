import { Document } from "mongoose";



export interface task extends Document {
    readonly title: string

    readonly description: string

    readonly link: string

    readonly points: number
}





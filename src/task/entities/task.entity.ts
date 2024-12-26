import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})
export class Task {
    @Prop({type : String , required : true})
    title : string

    @Prop({type : String})
    description : string

    @Prop({type : String})
    link : string

    @Prop({type : Number , required : true})
    points : number

    @Prop({type : [String], default : []})
    Completed :string[]
    
}


export const taskModel = SchemaFactory.createForClass(Task)

export class Product{
    _id?:Number;
    nombre:String;
    precio:Number;
    usuario:String;
    categoria:String

    constructor(nombre:String, precio:Number, usuario:String, categoria:String){
        this.nombre = nombre;
        this.precio = precio;
        this.usuario = usuario;
        this.categoria = categoria;
    }
}

export interface usuario{
    _id?:Number,
    nombre:String
}

export interface categoria{
    _id?:Number,
    nombre:String
}
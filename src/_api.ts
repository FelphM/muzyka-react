import { TableProducts } from "./_db"

export class MockDB {
    public static connect() {
    /*
    * Simula la conexión a la base de datos
    * Las posibilidades son un error o un success
    * Adicionalmente puede demorar mas o menos
    */
    }

    public static disconnect() {
    /*
    * Simula al desconexión de la base de datos
    * Puede demorarse mas o menos
    */
    }

    public static getResourceByTable(name: string): any[] | any {
    /*
    * Obtiene algo desde el archivo _db.ts para simular un select
    * Puede demorarse mas o menos
    */ 
        return []
    }
}
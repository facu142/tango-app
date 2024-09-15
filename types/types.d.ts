// types.d.ts
export interface Localidad {
    id: string;
    nombre: string;
  }
  
  export interface Provincia {
    id: number;
    nombre: string;
    localidades: Localidad[];
  }
  
// hooks/useProvincias.ts
import { useState, useEffect } from 'react';
import provinciasJson from '../database/provincias.json';
import { Provincia } from '../types/types';  // Asegúrate de ajustar la ruta del archivo según tu estructura de proyecto

const useProvincias = () => {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [localidades, setLocalidades] = useState<{ id: string; nombre: string }[]>([]);

  useEffect(() => {
    // Simula la carga de datos desde un archivo JSON local
    setProvincias(provinciasJson as Provincia[]);
  }, []);

  const getLocalidadesByProvinciaId = (provinciaId: number) => {
    const provincia = provincias.find(p => p.id === provinciaId);
    if (provincia) {
      setLocalidades(provincia.localidades);
    } else {
      setLocalidades([]);
    }
  };

  return { provincias, localidades, getLocalidadesByProvinciaId };
};

export default useProvincias;

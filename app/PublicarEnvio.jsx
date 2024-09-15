import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Importa el Picker del paquete correcto
import * as ImagePicker from 'expo-image-picker';
import useProvincias from '@/hooks/useProvincias';

export default function PublicarEnvioScreen() {
  const { provincias, localidades, getLocalidadesByProvinciaId } = useProvincias();

  const [tipoCarga, setTipoCarga] = useState('');
  const [calleRetiro, setCalleRetiro] = useState('');
  const [numeroRetiro, setNumeroRetiro] = useState('');
  const [provinciaRetiro, setProvinciaRetiro] = useState('');
  const [localidadRetiro, setLocalidadRetiro] = useState('');
  const [referenciaRetiro, setReferenciaRetiro] = useState('');
  const [fechaRetiro, setFechaRetiro] = useState(new Date());
  const [showDatePickerRetiro, setShowDatePickerRetiro] = useState(false);
  const [calleEntrega, setCalleEntrega] = useState('');
  const [numeroEntrega, setNumeroEntrega] = useState('');
  const [provinciaEntrega, setProvinciaEntrega] = useState('');
  const [localidadEntrega, setLocalidadEntrega] = useState('');
  const [referenciaEntrega, setReferenciaEntrega] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState(new Date());
  const [showDatePickerEntrega, setShowDatePickerEntrega] = useState(false);
  const [image, setImage] = useState(null);

  const handleProvinciaRetiroChange = (provinciaId) => {
    setProvinciaRetiro(provinciaId);
    getLocalidadesByProvinciaId(provinciaId);
  };

  const handleProvinciaEntregaChange = (provinciaId) => {
    setProvinciaEntrega(provinciaId);
    getLocalidadesByProvinciaId(provinciaId);
  };

  // Función para abrir la galería y seleccionar una foto
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publicar Pedido de Envío</Text>

      {/* Selector de tipo de carga */}
      <Text>Tipo de Carga</Text>
      <Picker
        selectedValue={tipoCarga}
        onValueChange={setTipoCarga}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un tipo de carga" value="" />
        <Picker.Item label="Documentación" value="Documentacion" />
        <Picker.Item label="Paquete" value="Paquete" />
        <Picker.Item label="Granos" value="Granos" />
        <Picker.Item label="Hacienda" value="Hacienda" />
      </Picker>

      {/* Formulario de domicilio de retiro */}
      <Text style={styles.subtitle}>Domicilio de Retiro</Text>
      <TextInput
        placeholder="Calle"
        value={calleRetiro}
        onChangeText={setCalleRetiro}
        style={styles.input}
      />
      <TextInput
        placeholder="Número"
        value={numeroRetiro}
        onChangeText={setNumeroRetiro}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={provinciaRetiro}
        onValueChange={handleProvinciaRetiroChange}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una provincia" value="" />
        {provincias.map(provincia => (
          <Picker.Item key={provincia.id} label={provincia.nombre} value={provincia.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={localidadRetiro}
        onValueChange={setLocalidadRetiro}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una localidad" value="" />
        {localidades.map(localidad => (
          <Picker.Item key={localidad.id} label={localidad.nombre} value={localidad.id} />
        ))}
      </Picker>
      <TextInput
        placeholder="Referencia (opcional)"
        value={referenciaRetiro}
        onChangeText={setReferenciaRetiro}
        style={styles.input}
      />

      {/* DatePicker para fecha de retiro */}
      <Button title="Seleccionar Fecha de Retiro" onPress={() => setShowDatePickerRetiro(true)} />
      {showDatePickerRetiro && (
        <DateTimePicker
          value={fechaRetiro}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || fechaRetiro;
            setShowDatePickerRetiro(false);
            setFechaRetiro(currentDate);
          }}
        />
      )}

      {/* Formulario de domicilio de entrega */}
      <Text style={styles.subtitle}>Domicilio de Entrega</Text>
      <TextInput
        placeholder="Calle"
        value={calleEntrega}
        onChangeText={setCalleEntrega}
        style={styles.input}
      />
      <TextInput
        placeholder="Número"
        value={numeroEntrega}
        onChangeText={setNumeroEntrega}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker
        selectedValue={provinciaEntrega}
        onValueChange={handleProvinciaEntregaChange}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una provincia" value="" />
        {provincias.map(provincia => (
          <Picker.Item key={provincia.id} label={provincia.nombre} value={provincia.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={localidadEntrega}
        onValueChange={setLocalidadEntrega}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una localidad" value="" />
        {localidades.map(localidad => (
          <Picker.Item key={localidad.id} label={localidad.nombre} value={localidad.id} />
        ))}
      </Picker>
      <TextInput
        placeholder="Referencia (opcional)"
        value={referenciaEntrega}
        onChangeText={setReferenciaEntrega}
        style={styles.input}
      />

      {/* DatePicker para fecha de entrega */}
      <Button title="Seleccionar Fecha de Entrega" onPress={() => setShowDatePickerEntrega(true)} />
      {showDatePickerEntrega && (
        <DateTimePicker
          value={fechaEntrega}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || fechaEntrega;
            setShowDatePickerEntrega(false);
            setFechaEntrega(currentDate);
          }}
        />
      )}

      {/* Selector de foto desde la galería */}
      <Button title="Seleccionar Foto" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

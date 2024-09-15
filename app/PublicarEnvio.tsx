import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Importa el Picker del paquete correcto
import * as ImagePicker from 'expo-image-picker';
import useProvincias from '@/hooks/useProvincias';
import moment from 'moment';

export default function PublicarEnvioScreen() {
  const { provincias, localidades, getLocalidadesByProvinciaId } = useProvincias();

  const [tipoCarga, setTipoCarga] = useState('');
  const [calleRetiro, setCalleRetiro] = useState('');
  const [numeroRetiro, setNumeroRetiro] = useState('');
  const [provinciaRetiro, setProvinciaRetiro] = useState<number | undefined>(undefined);
  const [localidadRetiro, setLocalidadRetiro] = useState<number | undefined>(undefined);
  const [referenciaRetiro, setReferenciaRetiro] = useState('');
  const [fechaRetiro, setFechaRetiro] = useState<Date>(new Date());
  const [showDatePickerRetiro, setShowDatePickerRetiro] = useState(false);
  const [calleEntrega, setCalleEntrega] = useState('');
  const [numeroEntrega, setNumeroEntrega] = useState('');
  const [provinciaEntrega, setProvinciaEntrega] = useState<number | undefined>(undefined);
  const [localidadEntrega, setLocalidadEntrega] = useState<number | undefined>(undefined);
  const [referenciaEntrega, setReferenciaEntrega] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState<Date>(new Date());
  const [showDatePickerEntrega, setShowDatePickerEntrega] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleProvinciaRetiroChange = (provinciaId: number) => {
    setProvinciaRetiro(provinciaId);
    getLocalidadesByProvinciaId(provinciaId);
  };

  const handleProvinciaEntregaChange = (provinciaId: number) => {
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
    <ScrollView style={styles.container}>
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
        <Picker.Item label="Seleccione una provincia" value={undefined} />
        {provincias.map(provincia => (
          <Picker.Item key={provincia.id} label={provincia.nombre} value={provincia.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={localidadRetiro}
        onValueChange={setLocalidadRetiro}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una localidad" value={undefined} />
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
      <View style={styles.datePickerButton} onTouchEnd={() => setShowDatePickerRetiro(true)}>
        <Text style={styles.datePickerText}>{moment(fechaRetiro).format('DD MMM YYYY')}</Text>
      </View>
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
        <Picker.Item label="Seleccione una provincia" value={undefined} />
        {provincias.map(provincia => (
          <Picker.Item key={provincia.id} label={provincia.nombre} value={provincia.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={localidadEntrega}
        onValueChange={setLocalidadEntrega}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione una localidad" value={undefined} />
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
      <View style={styles.datePickerButton} onTouchEnd={() => setShowDatePickerEntrega(true)}>
        <Text style={styles.datePickerText}>{moment(fechaEntrega).format('DD MMM YYYY')}</Text>
      </View>
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
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Seleccionar Foto</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
    </ScrollView>
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
    color: '#03045E',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0077B6',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  datePickerText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  imagePickerButton: {
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
});

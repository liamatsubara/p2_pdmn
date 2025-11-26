import { FlatList, Pressable, StyleSheet, Text, TextInput, View, Image, Linking } from 'react-native';
import Busca from './components/Busca';
import { useState } from "react";
import nasaClient from './utils/nasaClient';
import AntIcon from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {

  const [photos, setPhotos] = useState([]);

  const onBuscaRealizada = (termo) => {
    nasaClient.get('search/', {
      params: { q: termo }
    })
      .then(result => {
        const somenteImagens = result.data.photos.filter(
          item => item.data?.[0]?.media_type === "image"
        );
        const dezPrimeiras = somenteImagens.filter((_, index) => index < 10);

        setPhotos(dezPrimeiras);
      });
  };

  return (
    <View style={styles.container}>
      <Busca onBuscaRealizada={onBuscaRealizada} />

      <FlatList
        style={styles.list}
        data={photos}
        keyExtractor={(item) => item.data[0].nasa_id}
        numColumns={2} 
        renderItem={({ item }) => {
          const info = item.data?.[0];
          const imageUrl = item.links?.[0]?.href;

          return (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                {info?.title}
              </Text>

              {imageUrl && (
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: 200, height: 200 }}
                />
              )}

              <Text style={styles.description}>
                {info?.description}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
          <MaterialCommunityIcons name="face-woman-profile" size={36} color="black" />
        <Text>Lia Matsubara</Text>
        <View style={styles.socialIcons}>
          <Pressable
            onPress={() => Linking.openURL('https://www.linkedin.com/')}>
            <FontAwesome name="linkedin-square" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL('https://github.com/liamatsubara')}>
            <AntIcon name='github' size={24}/>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    alignItems:  'center'
  },
  list: {
    flex: 1,
    width: '80%',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  listItem: {
    width: '47%', 
    margin: 5,
    alignItems: 'center',
    paddingVertical: 8,
  },
  listItemText: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    marginTop: 2,
  },
  footer: {
    borderColor: '#DDD',
    borderWidth: 1,
    width: '80%',
    alignItems: 'center',
    padding: 12,
    marginTop: 8,
    borderRadius: 4,
    marginBottom: 10
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '10%', 
    marginTop: 8,
  },
});

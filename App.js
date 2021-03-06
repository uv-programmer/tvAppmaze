import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Detail from './Detail';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

const ListItem = ({ item,navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const baseUrl = 'http://api.tvmaze.com/shows';
  console.log(data);
  
  const routeChange = () =>{ 
    let path = Detail; 
    history.push(path);
  
  }

  return (
   
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

export default (navigation) => {
  useEffect((navigation) => {
    const source = axios.CancelToken.source();
    const url = 'http://api.tvmaze.com/shows';
    const fetchUser = async () => {
      const url = `http://api.tvmaze.com/shows`;
      const response = await axios.get(url);
      setData(response)
      console.log(response);
    };
  
  const routeChange = () =>{ 
    let path = './Detail.js'; 
    navigate(path);
  }

  }, []);
  const [data, setData] = useState([]);
  function callApi(){
    axios.get('https://api.tvmaze.com/shows')
    .then(function (response) {
      console.log("data......",response)
     // setData(response.data)
       movieData = response.data.map(function(item) {
        return {
          key: item.id,
          text: item.name,
          uri:item.image.medium
        };
       
      });
      setData(movieData)
console.log("print data array", movieData)
      return response;
    })
    .catch(function (error) {
      console.log("error",error);
    })
    }
  return (
 callApi(),
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={data}
                  renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => callApi()}>
                  <ListItem item={item} />
                  <Text>123</Text>
                 </TouchableOpacity>
                  }
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Drama',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Arrow',
        uri: 'https://static.tvmaze.com/uploads/images/medium_portrait/213/534017.jpg',
      },
      {
        key: '2',
        text: 'True Detective',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Drama',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'Science-Fiction',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});
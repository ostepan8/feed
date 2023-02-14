import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import React from 'react';

import {useWindowDimensions} from 'react-native';

const ProfileScroller = ({data, navigation}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={{left: -1}}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={item => {
          return (
            <View
              style={[
                {
                  height: width / 2.5,
                  width: width / 2.5,
                  marginHorizontal: 2,
                  borderRadius: 3,
                  overflow: 'hidden',
                },
              ]}>
              <Pressable
                onPress={() => {
                  navigation.navigate('YourPost', {
                    data: item.item,
                    index: item.index,
                  });
                }}>
                <Image
                  source={require('../dummy-data/assets/food1.jpg')}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}></Image>
              </Pressable>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

export default ProfileScroller;

const styles = StyleSheet.create({});

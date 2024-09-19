import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, refetch } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const {data:posts, refetch} = useAppWrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
   await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        // <Text className='text-3xl text-white'>{item.title}</Text>
        <VideoCard
        title={item.title}
        thumbnail={item.thumbnail}
        video={item.video}
        creator={item.users.username}
        avatar={item.users.avatar}
      />
    )}
    
      ListHeaderComponent={()=>(
        <View className='my-6 px-4 space-y-6'>
          <View className='justify-between item-start flex-row mb-6'>
            <View>
              <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
              <Text className='font-pmedium text-2xl text-gray-100'>AppReals</Text>
            </View>
            <View className='mt-1.5'>
              <Image
              source={images.logoSmall}
              className='w-9 h-10'
              resizeMode='contain'
              />
            </View>
          </View>
          <SearchInput/>
          <View className='w-full flex-1 pt-5 pb-8'>
            <Text className='text-gray-100 text-lg-font-pregular mb-3'>
              Latest  videos
            </Text>
             <Trending
             posts={posts}
             />
          </View>
        </View>
      )}
      ListEmptyComponent={()=>(
       <EmptyState 
       title = 'No videos Found '
       subtitle= "Be the first to upload video "
       />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      
      </SafeAreaView>
  )
}

export default Home
import { View, Text, Image, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function Home() {
const {user} = useUser();
const {signOut,isSignedIn} = useAuth();

useEffect(()=>{
  if(!isSignedIn){
    router.push('/SingUp')
  }
},[isSignedIn])

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
      {user ? (

        <Image source={{uri:user.imageUrl}} style={{width:100,height:100,borderRadius:50,}}/>
      ):("")}
      <Text>User Email: {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Full Name: {user?.fullName}</Text>

      <View>
        <Button title='Sing Out' onPress={async()=>{
          await signOut();
        }}/>
      </View>
    </View>
  )
}
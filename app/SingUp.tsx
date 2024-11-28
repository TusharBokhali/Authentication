import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Link, router } from 'expo-router'
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()

export default function SingUp() {

    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
    const onPress = React.useCallback(async () => {
        
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
        })
  
        if (createdSessionId) {
          setActive!({ session: createdSessionId })
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error('OAuth error', err)
    }
}, [])

const {user} = useUser();

const {isSignedIn} = useAuth();
console.log(user);

useEffect(()=>{
    if(isSignedIn){
        router.push('/Home')
    }
},[isSignedIn])
    
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
        <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:10,backgroundColor:'blue',borderRadius:7,}} onPress={async()=>{await onPress()}}>
            <Text style={{color:'white'}}>SingUp</Text>
        </TouchableOpacity>
        {
            user ? (
        <Image source={{uri:user.imageUrl}} style={{width: 100,height:100,borderRadius:50,}}/>
            ):('')
        }
    </View>
  )
}
import { View, Text, ScrollView, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router'
import { getCurrentUser,signInUser,signOut } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [form, setForm] = useState({
    email:'',
    password:''
   });

const submit = async ()=>{
 if(!form.email || !form.password){
   Alert.alert('Error','Please fill in all the fields');
   return;
 }
//  setIsSubmitting(true);
 try{
  console.log(form.email, form.password);
  // await signOut();
  await signInUser(form.email, form.password);
  const result = await getCurrentUser();
  setUser(result);
  setIsLogged(true);

  Alert.alert("Success", "User signed in successfully");
  router.replace("/home");
 }catch(e){
   Alert.alert('Error',e.message)
 }finally{
   setIsSubmitting(false);
 }

}
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[82vh] px-4 my-6'>
          <Image source={images.logo} reseizeMode='contain'  className='w-[115px] h-[35px]'/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to arora</Text>
          <FormField
          title='Email'
          value={form.email}
          handleChangeText={(e)=>setForm({...form,
            email:e})}
          otherStyles="mt-7"
          keyBoardType="email-address"
          />
          <FormField
          title='Password'
          value={form.password}
          handleChangeText={(e)=>setForm({...form,
            password:e})}
          otherStyles="mt-7"
          />
          <CustomButton
          title="Sign In"
          onPressed={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
              </Text>
              <Link href="/sign-up" className='text-lg text-secondary'>Sign Up</Link>
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
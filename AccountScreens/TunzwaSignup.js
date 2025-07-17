
import React, { useState,useCallback, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
  Pressable,
 TextInput,
 Linking,
 Animated,
  
  Alert, Image, StyleSheet, ActivityIndicator,Platform, Text, Dimensions,
   ScrollView, Touchable, TouchableOpacity } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');
const SigninScreen = ({ navigation }) => {

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];

    const handleLogin = () => {
        setLoading(true);
        
        // Start fade animation
        Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 200,
            useNativeDriver: true
        }).start();

        // Simulating API Call (3s)
        setTimeout(() => {
            setLoading(false);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        }, 3000);
    };

    return (
        <LinearGradient colors={['#1c1c1c', '#000']} style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                
                {/* Logo & Company Info */}
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logo} />
                    <Text style={styles.companyName}>Twins Microfinance</Text>
                    <Text style={styles.description}>Welcome back! Please log in to continue.</Text>
                </View>

                {/* Username Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Username"
                        placeholderTextColor="#bbb"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password"
                        placeholderTextColor="#bbb"
                        secureTextEntry={secureText}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Loader Overlay */}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '85%',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderRadius:50,
    },
    companyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#bbb',
        textAlign: 'center',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
    },
    loginButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default SigninScreen;

import React from 'react';
import { 
    Bubble, 
    GiftedChat, 
    SystemMessage, 
    Day,
    InputToolbar,
} from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            isConnected: false,
            image: null,
            location: null,
        };

        // SDK from Firestore
        const firebaseConfig = {
            apiKey: "AIzaSyDLGWMFCJZsv5QDR-lUTSuIuFXqX1u6QAM",
            authDomain: "chatapp-9aa19.firebaseapp.com",
            projectId: "chatapp-9aa19",
            storageBucket: "chatapp-9aa19.appspot.com",
            messagingSenderId: "430592414345",
            appId: "1:430592414345:web:d3551c24f0d863bf86ec58",
            measurementId: "G-7P4V4V030N"
        };

        // initializes the Firestore app
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }

        // references the collection to query its documents
        this.referenceChatMessages = firebase.firestore().collection('messages');

        this.refMsgsUser = null;
    }

    // get messages from AsyncStorage
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    // save messages to AsyncStorage
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    };

    // creates the initial welcome message and the system message when component did mount
    componentDidMount() {

        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        
        this.referenceChatMessages = firebase.firestore().collection('messages');

        // checks if the user is online
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');

                // listens for updates in the collection
                this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);

                // listens to authentication
                this.authUnsubscribe = firebase
                .auth()
                .onAuthStateChanged(async user => {
                if (!user) {
                    return await firebase.auth().signInAnonymously();
                }
                this.setState({
                    uid: user.uid,
                    messages: [],
                    user: {
                        _id: user.uid,
                        name: name,
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                });
                // referencing messages of current user
                this.refMsgsUser = firebase
                    .firestore()
                    .collection('messages')
                    .where('uid', '==', this.state.uid);
                });
                // save messages when user online
                this.saveMessages();
            } else {
                // if the user is offline
                this.setState({ isConnected: false });
                console.log('offline');
                // retrieve messages from AsyncStorage
                this.getMessages();
            }
        });

        
    }

    componentWillUnmount() {
        // stop listening for changes
        this.unsubscribe();
        // stop listening to authentication
        this.authUnsubscribe();
    }

    /* retrieves the current data in "messages" collection and 
    stores it in state "messages" to render it in view */
    onCollectionUpdate = QuerySnapshot => {
        const messages = [];
        // go through each document
        QuerySnapshot.forEach(doc => {
            // gets the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages: messages
        });
        this.saveMessages();
    };

    addMessages() {
        const message = this.state.messages[0];
        // adds new message to the collection
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || '',
            location: message.location || null,
        });
    }

    // appends the new message a user just sent to the state messages so it can be displayed in chat
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
            this.saveMessages();
        });
    }

    // changes the default color of the chat text bubble on the right
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    },
                    left: {
                        backgroundColor: 'white'
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props} textStyle={{ color: '#fff' }} />
        );
    }

    renderDay(props) {
        return (
            <Day
                {...props}
                    textStyle={{
                        color: '#fff',
                        backgroundColor: 'gray',
                        borderRadius: 15,
                        padding: 10,
                    }}
            />
        );
    }

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    renderCustomActions = (props) => {
    return <CustomActions {...props} />;
    };

    // returns a mapview when user adds a location to current message
    renderCustomView (props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    render() {
        // changes background color of chat screen
        const { bgColor } = this.props.route.params;

        return (
            <View style={{flex: 1, backgroundColor: bgColor}}>
            <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderActions={this.renderCustomActions}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderCustomView={this.renderCustomView}
            renderSystemMessage={this.renderSystemMessage}
            renderUsernameOnMessage={true}
            renderDay={this.renderDay}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{ 
                _id: this.state.user._id,
                name: this.state.name,
                avatar: this.state.user.avatar,
            }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}
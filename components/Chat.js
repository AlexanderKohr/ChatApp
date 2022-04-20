import React from 'react';

// Imports GiftedChat 
import { 
    Bubble, 
    GiftedChat, 
    SystemMessage, 
    Day,
    InputToolbar,
    SendButton,
    LeftAction,
    ChatInput
} from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

import * as firebase from "firebase/compat";
import "firebase/compat/firestore";

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
            }
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
                user: data.user
            });
        });
        this.setState({
            messages,
        });
    };

    // creates the initial welcome message and the system message when component did mount
    componentDidMount() {

        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        
        this.referenceChatMessages = firebase.firestore().collection('messages');

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
            this.refMsgsUser = firebase
                .firestore()
                .collection('messages')
                .where('uid', '==', this.state.uid);

            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
        });
    } 

    componentWillUnmount() {
        // stop listening for changes
        this.unsubscribe();
        // stop listening to authentication
        this.authUnsubscribe();
    }

    addMessages() {
        const message = this.state.messages[0];
        // adds new message to the collection
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    // appends the new message a user just sent to the state messages so it can be displayed in chat
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
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

    render() {
        const { bgColor } = this.props.route.params;

        return (
            <View style={{flex: 1, backgroundColor: bgColor}}>
            <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderSystemMessage={this.renderSystemMessage}
            renderDay={this.renderDay}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{ 
                _id: this.state.user._id,
                name: this.state.name,
                avatar: this.state.user.avatar 
            }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}
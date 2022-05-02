import React from 'react';
// imports React Native functionalities
import { 
    View, 
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    KeyboardAvoidingView
} from 'react-native';
// imports default background image from assets
import BackgroundImage from '../assets/BackgroundImage2.jpg';
import icon from '../assets/usericon.png'

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '', 
            bgColor: this.colors.blue 
        };
    }

    // function to update the chat background color chosen user
    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    }

    // defined background colors to choose from by user
    colors = {
        LightGreen: '#d8e2dc',
        LightOrange: '#ffe5d9',
        LightPink: '#fcd5ce',
        LightGray: '#e5e5e5'
    }

    render() {
        return (
            // components to create color arrays, title, button, background image
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>

                    <View style={styles.titleBox} >
                        <Text style={styles.title}>ChatApp</Text>
                    </View>

                    <View style={styles.contentBox}>
                        <View style={styles.inputBox}>
                            <Image source={icon} style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder='Your name'
                            />
                        </View>
                    

                        <View style={styles.colorHeader}>
                            <Text style={styles.chooseColors}>Choose Background Color</Text>
                        </View>

                        {/* colors to choose from for chat background */}
                        <View style={styles.colorsArray}>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color dark'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color1}
                                onPress={() => this.changeBgColor(this.colors.LightGreen)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color purple'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.LightOrange)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color blue'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.LightPink)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color green'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.LightGray)}>
                            </TouchableOpacity>
                        </View>

                        {/* Button to go to chat screen. 
                        Takes the name the user typed in and passes it to the top 
                        of the navigation bar in chat screen */}
                        <Pressable
                            accessible={true}
                            accessibilityLabel='Go to Chat'
                            accessibilityHint='Lets you navigate to the chat screen'
                            accessibilityRole='button'
                            style={styles.button}
                            title='Got to Chat'
                            onPress={() => this.props.navigation.navigate('Chat', { 
                                name: this.state.name,
                                bgColor: this.state.bgColor })}>
                            
                            <Text style={styles.buttonTex}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
                { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}

// creates the app's stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    backgroundImage: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleBox: {
        height: '44%',
        width: '88%',
        alignItems: 'center',
        paddingTop: 50,
    },

    title: {
        fontSize: 45,
        fontWeight: "600",
        color: '#06d6a0'
    },

    contentBox: {
        backgroundColor: 'white',
        height: '44%',
        width: '88%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
    },

    inputBox: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#979dac',
        width: '88%',
        height: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },

    input: {
        fontSize: 16,
        fontWeight: "300",
        color: '#403d39',
        opacity: 0.8
    },

    colorHeader: {
        width: '88%',
        alignItems: 'center'
    },

    chooseColors: {
        fontSize: 16,
        fontWeight: "300",
        color: '#979dac',
        opacity: 1,
    },

    colorsArray: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        opacity: 1
    },

    color1: {
        backgroundColor: '#d8e2dc',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    color2: {
        backgroundColor: '#ffe5d9',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    color3: {
        backgroundColor: '#fcd5ce',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    color4: {
        backgroundColor: '#e5e5e5',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    button: {
        height: 70,
        width: '88%',
        backgroundColor: '#06d6a0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },

    buttonTex: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: "600"
    }

});
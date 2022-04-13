import React from 'react';
import { 
    View, 
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import BackgroundImage from '../assets/BackgroundImage.png';
import icon from '../assets/usericon.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', bgColor: this.colors.blue };
    }

    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    }

    colors = {
        dark: '#090C08',
        purple: '#474056',
        blue: '#8A95A5',
        green: '#B9C6AE'
    }

    render() {
        return (
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

                        <View style={styles.colorsArray}>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color dark'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color1}
                                onPress={() => this.changeBgColor(this.colors.dark)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color purple'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color2}
                                onPress={() => this.changeBgColor(this.colors.purple)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color blue'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color3}
                                onPress={() => this.changeBgColor(this.colors.blue)}>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel='Background color green'
                                accessibilityHint='Lets you choose a color for the chat background'
                                accessibilityRole='button'
                                style={styles.color4}
                                onPress={() => this.changeBgColor(this.colors.green)}>
                            </TouchableOpacity>
                        </View>

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
            </View>
        )
    }
}

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
        alignItems: 'center'
    },

    title: {
        fontSize: 45,
        fontWeight: "600",
        color: '#FFF'
    },

    contentBox: {
        backgroundColor: 'white',
        height: '44%',
        width: '88%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    inputBox: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: 'gray',
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
        color: '#757083',
        opacity: 0.5
    },

    colorHeader: {
        marginRight: 'auto',
        paddingLeft: 15,
        width: '88%'
    },

    chooseColors: {
        fontSize: 16,
        fontWeight: "300",
        color: '#757083',
        opacity: 1
    },

    colorsArray: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        opacity: 1
    },

    color1: {
        backgroundColor: '#090C08',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    color2: {
        backgroundColor: '#474056',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    color3: {
        backgroundColor: '#8A95A5',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    color4: {
        backgroundColor: '#B9C6AE',
        height: 50,
        width: 50,
        borderRadius: 25
    },

    button: {
        height: 70,
        width: '88%',
        backgroundColor: '#757083',
        alignItems: 'center',
        justifyContent: 'center'
        
    },

    buttonTex: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: "600"
    }

});
import OpenAI from 'openai';
import { apiKey } from './config.js'

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

// Rest of your code remains the same


let returnedValues = []


const messages = [
    {
        role: 'system',
        content: ''
    },
    {
        role: 'user',
        content: ''
    }
];

async function callOpenAI() {   
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages
        });        
        returnedValues.push(response.choices[0].message.content)
        document.getElementById('returned-text').innerHTML = `${returnedValues}`
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        // Handle errors here
    }

}

const userInput = document.getElementById('userInput');

const button = document.querySelector('button[type=submit]')
button.addEventListener('click', (e) => {
    e.preventDefault()
    messages[1].content = userInput.value
    console.log(messages)
    expandAnswer()
    callOpenAI()
})

// Your existing DOM manipulation code (not directly related to OpenAI)
const radios = document.querySelectorAll('input[name="language"]');
radios.forEach(radio => {
    radio.addEventListener('change', function() {
            messages[0].content = passLangToMsg(this.value)
            console.log(messages)
    });
});

function passLangToMsg(language) {
    return (
        `You are a ${language} language translator. Return the provided text in ${language}.`
    )
    
}

const answerBox = document.getElementById('returned-text')
const respondHeader = document.getElementById('respond-header')

function expandAnswer() {
    answerBox.style.height = "120px"
    answerBox.style.opacity = 1; 
    respondHeader.innerHTML = "Translation"
}

const spaceShip = document.getElementById('klingonLang');
const headerImage = document.getElementById('headerImage');

spaceShip.addEventListener('change', function(){
    if(this.checked) {
        headerImage.src = "images/worf-1.png";
        setTimeout(function(){
            headerImage.src = "images/parrot.png";
        }, 2000);
    }
});
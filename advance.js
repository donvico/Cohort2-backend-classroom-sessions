#!\usr\bin\ node

const readLine = require('readline')
const {exec} = require('child_process')


const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('What is your name? [y | n]',(answer)=>{
    if(answer !='y'){
        console.log('you entered a wrong value');
        process.exit(1)
    }
    console.log(answer, 'the user answer');
    rl.close()
})


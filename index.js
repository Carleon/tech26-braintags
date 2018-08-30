const brain = require('brain.js')
const loadTransactions = require('./loadTransactions')
const network = new brain.NeuralNetwork()

let train = loadTransactions(process.env.user, process.env.pwd).then(train => {
    const trainingData = (require('./training.json')).map(t => ({
        input: encode(t.merchantName || t.partnerName),
        output: {[t.category.replace('micro-v2-', '').replace('-', '')]: 1}
    }))
    
    network.train(trainingData)
    
    const output = network.run(encode('AMAZON'))
    
    console.log(output)
})

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}
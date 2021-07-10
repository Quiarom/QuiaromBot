const Discord = require('discord.js')
const fetch = require("node-fetch")
const client = new Discord.Client()

const sadWords = [
	"sad", 
	"depressed", 
	"unhappy", 
	"angry",
	"triste"
	]

const encouragments = [
	"Llora pues"
]

function getQuote() {
	return fetch("https://zenquotes.io/api/random")
		.then(res => {
			return res.json()
		})
		.then(data => {
			// q = Quote and a = Author
			return data[0]["q"] + " -" + data[0]["a"]
		})
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`) 
})

client.on("message", msg => {
	if (msg.author.bot) return 

	if (msg.content === "$inspire") {
		getQuote().then(quote => msg.channel.send(quote))
	}

	if (sadWords.some(word => msg.content.includes(word))){
		const encouragment = encouragments[Math.floor(Math.random() * encouragments.length)]
		msg.reply(encouragment)
	}
})

client.login(process.env.TOKEN)
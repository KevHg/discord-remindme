const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("learning to be a NEET")
})

client.on('message', message => {
    if (message.content.toLowerCase().startsWith("remindme")) {
        var split_msg = message.content.split(' ');
        if (split_msg.length < 3){
            failSyntax(message);
        } else {
            var time_msg = split_msg[1];
            var alert_msg = split_msg.slice(2, split_msg.length).join(' ');

            var miliseconds = timeToMiliseconds(time_msg);
            if (miliseconds < 0){
                failSyntax(message);
            } else {
                var interval = setTimeout(function () {
                    message.channel.send(message.author.toString() + " " + alert_msg)
                    .catch(console.error);
                }, miliseconds);
            }
        }
    }
});

function timeToMiliseconds(time_string){
    var time_code = time_string[time_string.length-1];
    var time = parseInt(time_string.slice(0, time_string.length-1));

    if (time_code == 'h'){
        miliseconds = time * 60 * 60 * 1000;
    } else if (time_code == 'm'){
        miliseconds = time * 60 * 1000;
    } else if (time_code == 's'){
        miliseconds = time * 1000;
    } else {
        return -1;
    }
    return miliseconds;
}

function failSyntax(message){
    message.channel.send(message.author.toString() + ", syntax is 'remindme [number][h/m/s] [message]'.");
}


bot_secret_token = "REPLACE WITH BOT SECRET KEY"
client.login(bot_secret_token)

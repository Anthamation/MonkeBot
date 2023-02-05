//Core Dependencies
const Discord = require("discord.js");
const client = new Discord.Client();
const JsonDB = require('node-json-db');
const config = require("./config.json");
const fs = require('fs');

//Added Databases
const db = new JsonDB("edb", true, true);
const edb = require("./edb.json");
const jwdb = new JsonDB("wdb", true, true);
const wdb = require("./wdb.json");
const jbddb = new JsonDB("bddb", true, true);
const bddb = require("./bddb.json")
const YN_list = require("./YN_List.json");
const hruf_List = require("./HRUF.json");
const onearg = require('./choose/1.json')
const twoarg = require('./choose/2.json')
const threearg = require('./choose/3.json')

client.login(config.token)


//init. checks
 
client.on('ready', () => {
    //VC Existance
    if(client.voiceConnections.exists === true){
        let vc = client.voiceConnections.find(val = val.channel.guild.id == msg.guild.id);
        vc.disconnect();
    }
    if(client.voiceConnections.exists === false){
        return
    }
    //unverified Check
    var unverifiedCheck = setInterval(uvcTimer, 1000)
    function uvcTimer(){
        fs.readFile("edb.json", "UTF-8", (error, data) => {
            if (error) {
                console.error(error)
            }
            var pdata = JSON.parse(data)
            var unverified = pdata.unverified;
            for (var key in unverified) {
                if (unverified.hasOwnProperty(key)) {
                    let id = unverified[key].UserID
                    var GuildID = client.guilds.get('Guidd ID')
                    let time = unverified[key].UserEX
                    let MemberRole = GuildID.roles.get('1061669653774082048')
                    if (time <= new Date().getTime()) {
                        var ddp = "/unverified/ID"
                        var nddp = ddp.replace('ID', key)
                        GuildID.fetchMember(key).then(member => {
                            member.kick("You have failed to verify yourself. If you wish to try again, please find another invite.")
                            console.log(`${member.displayName} failed to verify. Kicking...`)
                        })
                        db.delete(nddp)
                    }
                }if(!unverified.hasOwnProperty(key)){
                    return
                }
            }
        })
    }
    console.log('MonkeBot 1.0.0 STABLE successfully connected. Awaiting commands.')
})

//Messaging Functions============================================================================================================================================================================

client.on('message', msg => {
   //required variables
    const CurrentTime = new Date();
    var GuildID = client.guilds.get('1061666097981571132')
    let MemberRole = GuildID.roles.get('1061669653774082048')
    let ModRole = GuildID.roles.get('1067263270064508938')
    let AdminRole = GuildID.roles.get('1061668534314356817')
    let MunkheeRole = GuildID.roles.get('1067613907474194472')
    var generalChannel = client.channels.get('1061666098954633248')

    //Botception Prevention
    if(msg.author.bot) return
    //Link Obliterator
    if (msg.content.includes("https://discord.gg/")) {
        msg.delete()
        msg.member.send('You are reminded that outside Discord server links are not permitted in the server.')
        var GuildID = client.guilds.get('1061666097981571132')
        GuildID.fetchMember(msg.author.id).then(member => {
            console.log(`${member.displayName} has had their Discord link obliterated on ${CurrentTime}`)
        })
    }
    //User Commands
    //Yes/No Function
    if (msg.content.startsWith(config.prefix + "MonkeBot,")) {
        var GuildID = client.guilds.get('1061666097981571132')
        GuildID.fetchMember(msg.author.id).then(member => {
            msg.reply(YN_list.YN_options[Math.floor(Math.random() * 51)])
            console.log(`${member.displayName} has used the Y/N command on ${CurrentTime}`)
        })
    }
    //Hello function
    if (msg.content.startsWith(config.prefix + "Hello!")) {
        var GuildID = client.guilds.get('1061666097981571132')
        GuildID.fetchMember(msg.author.id).then(member => {
            msg.reply("Hi there!")
            console.log(`${member.displayName} has used the Hello! command on ${CurrentTime}`)
        })
    }
    //How are you Function
    if (msg.content.startsWith(config.prefix + 'How are you?')) {
        var GuildID = client.guilds.get('1061666097981571132')
        GuildID.fetchMember(msg.author.id).then(member => {
            msg.reply(hruf_List.HRUFList[Math.floor(Math.random() * 10)])
            console.log(`${member.displayName} has used the HAY command on ${CurrentTime}`)
        })
    }
    //Birthday Function
    if(msg.content.startsWith(config.prefix + 'BDAY')){
        const args = msg.content.slice(config.prefix.length).slice("BDAY".length).trim().split("/");
        var name = msg.author.tag
        var id = msg.author.id
        let month = Number(args[0]);
        let day = Number(args[1]);
        var UserTag = {};
        var bmonth = {};
        var bday = {};
        if(isNaN(month || day)){
            msg.delete();
            msg.author.send("The format entered is not readable. The correct format is ``<Month Number 1-12>/<Day Number 1-31>``")
            console.log(`BDAY:${msg.author.tag} entered an incorrect format. (Error A)`)
            return
        }
        if(!isNaN(month || day)){
            if(month.length || day.length > 2){
                msg.delete();
                msg.author.send("The format entered is not readable. The correct format is ``<Month Number 1-12>/<Day Number 1-31>``")
                console.log(`BDAY:${msg.author.tag} entered an incorrect format. (Error B)`)
                return
            }
            else {
                if(month > 12){
                    msg.delete();
                    msg.author.send("Months range from 1 to 12. Please try again.")
                    console.log(`BDAY:${msg.author.tag} entered an incorrect format. (Error C)`)
                    return
                }
                if(day > 31){
                    msg.delete();
                    msg.author.send("Days range from 1 to 31. Please try again.")
                    console.log(`BDAY:${msg.author.tag} entered an incorrect format. (Error D)`)
                    return
                }
                else {
                    fs.readFile("bddb.json", "UTF-8", (error, data) => {
                        if (error) {
                            console.error(error)
                        }
                        var rdata = JSON.parse(data)
                        var Birthdays = rdata.Birthdays;
                        
                        for (var key in Birthdays){
                            if (Birthdays.hasOwnProperty(key)){
                                let tag = Birthdays[key].UserTag;
                                let months = Birthdays[key].bmonth;
                                let days = Birthdays[key].bday;
                                if(Birthdays.hasOwnProperty(id)){
                                    let months = Birthdays[key].bmonth;
                                    let days = Birthdays[key].bday;
                                    UserTag = name;
                                    bmonth = month;
                                    bday = day;
                                    let formattedMonth = month - 1
                                    var datapath = "/Birthdays/User"
                                    var ndp = datapath.replace('User', id)
                                    let bdayData = {name, formattedMonth, day}
                                    jbddb.push(ndp,bdayData)
                                    jbddb.reload();
                                    msg.delete();
                                    msg.author.send(`Birthday updated! Birthday set on ${month}/${day}!`)
                                    console.log(`BDAY:${msg.author.tag} has updated their birthday for ${month}/${day}`)
                                }
                                if(!Birthdays.hasOwnProperty(id)){
                                    let formattedMonth = month - 1
                                    let bdayData = {name, formattedMonth, day}
                                    var datapath = "/Birthdays/User";
                                    var ndp = datapath.replace('User', id)
                                    jbddb.push(ndp, bdayData);
                                    jbddb.reload();
                                    msg.delete();
                                    msg.author.send(`Birthday confirmed! Birthday set on ${month}/${day}!`)
                                    console.log(`BDAY:${msg.author.tag} has confirmed their birthday for ${month}/${day}`)
                                }
                            }
                        }
                        if(!Birthdays.hasOwnProperty(key)){
                            let formattedMonth = month - 1
                            let bdayData = {name, formattedMonth, day}
                            var datapath = "/Birthdays/User";
                            var ndp = datapath.replace('User', id)
                            jbddb.push(ndp,bdayData);
                            jbddb.reload();
                            msg.delete();
                            msg.author.send(`Birthday confirmed! Birthday set on ${month}/${day}!`)
                            console.log(`BDAY:${msg.author.tag} has confirmed their birthday for ${month}/${day}`)
                        }
                    })
                }
            }   
        }
    }
    //help function
    if (msg.content.startsWith(config.prefix + 'Help')) {
        var GuildID = client.guilds.get('1061666097981571132')
        GuildID.fetchMember(msg.author.id).then(member => {
            if (!member.roles.has(MemberRole.id)) {
                member.send("You have not been verified yet, so there are no commands available for you.")
            }
            if (member.roles.has(MemberRole.id)) {
                console.log(`${member.displayName} has used the HELP function`)
                member.send({
                    embed: {
                        title: "Your commands as a **__Member__**",
                        description: "My prefix is __!mb!__",
                        color: 9498256,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        fields: [{
                            name: "Ping",
                            value: "__**Usage:** !mb!ping__\nTest the ping",
                        },
                        {
                            name: "ID",
                            value: "__**Usage:** !mb!ID__\nView your personal ID card."
                        },
                        {
                            name:"Choose",
                            value: "__**Usage:** !mb!Choose <Example1>, <Example2>, or <Example3>?__\nUse the bot to decide from a pool of options you provide. The options are seperated from spaces, commas and \"or\". This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel"
                        },
                        {
                            name: "Ask MonkeBot(Yes/No)",
                            value: "__**Usage:** !mb!MonkeBot, <Any Yes/No>__\nAsk the bot a question. This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel",
                        },
                        {
                            name: "Hello",
                            value: "__**Usage:** !mb!Hello__\nSay hello to the bot!",
                        },
                        {
                            name: "How are you?",
                            value: "__**Usage:** !mb!How are you?__\nAsk the bot how it's feeling. This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel",
                        },
                        {
                            name: "Birthday",
                            value: "__**Usage:** !mb!Birthday <Input your month number: 1-12>/<Input your day number: 1-31>__\nTell the bot when your birthday is and have it announced."
                        },
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "Current Version: 1.0.0."
                        }
                    }
                });
            }
        })
    }
    //Gatekeeper Function
    //Gatekeeper - Direct Message
    if (msg.content.toLowerCase() == 'agree' && msg.channel.type === 'dm') {

        GuildID.fetchMember(msg.author.id).then(member => {
            if (member.roles.has(MemberRole.id)) return
            if (!member.roles.has(MemberRole.id)) {
                if (!msg.content.includes() == 'agree') {
                    msg.author.send("Incorrect! Please Try Again! Remember, it's only ONE word, NOTHING ELSE. If you include other words, **I will not recognize it.**")
                }
                member.addRole(MemberRole).then(member => {
                        var ddp = "/unverified/ID"
                        var nddp = ddp.replace('ID', member.id)
                        db.delete(nddp)
                })            
                msg.author.send(`Congratulations! You are now a member of the server! Enjoy your stay!`)
                fs.readFile("bddb.json", "UTF-8", (error, data) => {
                    if(error){
                        console.log(error)
                    }
                    var bdata = JSON.parse(data)
                    var Birthdays = bdata.Birthdays;
                    for (var key in Birthdays){
                        if(Birthdays.hasOwnProperty(key)){
                            if(Birthdays.hasOwnProperty(msg.author.id)){
                                var birthmonth = Birthdays[msg.author.id].formattedMonth;
                                var birthDAY = Birthdays[msg.author.id].day;
                                var reformattedmonth = Number(birthmonth) + 1;
                                var infostr = "month/day"
                                var BDAYstr = infostr.replace("month",reformattedmonth).replace("day",birthDAY)
                            }
                            if(!Birthdays.hasOwnProperty(msg.author.id)){
                                BDAYstr = "No Data"
                            }
                        }
                    }
                    if(!Birthdays.hasOwnProperty(key)){
                        let BDAYstr = "No Data"
                    }
                    console.log(BDAYstr)
                    fs.readFile("wdb.json", "UTF-8", (error, data) => {
                        if(error){
                            console.error(error)
                        }
                        var pdata = JSON.parse(data)
                        var warned = pdata.warned;
                        for (var key in warned){
                            if(warned.hasOwnProperty(key)){
                                if(warned.hasOwnProperty(msg.author.id)){
                                    var count = warned[msg.author.id].UserCt;
                                    let infostr = "0"
                                var countstr = infostr.replace("0",count)
                                }
                                if(!warned.hasOwnProperty(msg.author.id)){
                                    var countstr = 0
                                }
                            }
                        }
                        if(!warned.hasOwnProperty(key)){
                            var countstr = 0
                        }
                        console.log(countstr)
                        GuildID.fetchMember(msg.author.id).then(member => {
                            const embed = new Discord.RichEmbed({
                                thumbnail: {
                                  url: msg.author.avatarURL
                                },
                                title: msg.author.tag,
                                color: 4886754,
                                author: {
                                  name: "Roast Munkhee's Troop ID CARD"
                                },
                                fields: [
                                  {
                                    name: "USER ID",
                                    value: "```" + member.id + "```",
                                    inline: true
                                  },
                                  {
                                    name: "JOINED ON",
                                    value: "```" + member.joinedAt.toDateString() + "```",
                                    inline: true
                                  },
                                  {
                                    name: "RANK",
                                    value: "```" + member.highestRole.name + "```"
                                  }
                                  ,
                                  {
                                      name: "BIRTHDAY",
                                      value: "```" + BDAYstr + "```",
                                      inline: true
                                  },
                                  {
                                      name: "WARNING COUNT",
                                      value: "```" + countstr + "```",
                                      inline: true
                                  }
                                ]
                              })
                              member.send(embed)
                        })
                    })
            })
                msg.author.send({
                    embed: {
                        title: "Your commands as a **__Member__**",
                        description: "My prefix is __!mb!__",
                        color: 9498256,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        fields: [{
                            name: "Ping",
                            value: "__**Usage:**!mb!ping__\nTest the ping",
                        },
                        {
                            name: "Ask MonkeBot(Yes/No)",
                            value: "__**Usage:** !mb!MonkeBot, <Any Yes/No>__\nAsk the bot a question. This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel",
                        },
                        {
                            name: "Hello",
                            value: "__**Usage:** !mb!Hello__\nSay hello to the bot!",
                        },
                        {
                            name: "How are you?",
                            value: "__**Usage:** !mb!How are you?__\nAsk the bot how it's feeling. This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel",
                        },
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "```Current Version: 1.0.0"
                        }
                    }
                })

                client.channels.get('General').send(`${member.displayName} has been verified and confirmed as a new member! Please welcome them to the server!`)
                console.log(`${member.displayName} has been verified via DM on ${CurrentTime}`)
                
            }
            
        }
        )
    }
    //gatekeeper - Rules Channel
    if (msg.content.toLowerCase() == 'agree' && msg.channel.id === '1061669358742556712') {
        if (msg.member.roles.has(MemberRole.id)) return
        if (!msg.member.roles.has(MemberRole.id)) {
            if (!msg.content.includes() == 'agree') {
                msg.member.send("Incorrect! Please Try Again! Remember, it's only ONE word, NOTHING ELSE. If you include other words, **I will not recognize it.**")
                msg.delete()
            }
        }
        msg.member.addRole(MemberRole).then(member => {
            var ddp = "/unverified/ID"
            var nddp = ddp.replace('ID', member.id)
            db.delete(nddp)
    })
        msg.delete()
        msg.member.send(`Congratulations! You are now a member of the server and here is your very own ID card! This let's you know where you stand as far as general info for your membership. Please enjoy your stay.\n If you need help, try !mb!Help!`)
        fs.readFile("bddb.json", "UTF-8", (error, data) => {
            if(error){
                console.log(error)
            }
            var bdata = JSON.parse(data)
            var Birthdays = bdata.Birthdays;
            for (var key in Birthdays){
                if(Birthdays.hasOwnProperty(key)){
                    if(Birthdays.hasOwnProperty(msg.author.id)){
                        var birthmonth = Birthdays[msg.author.id].formattedMonth;
                        var birthDAY = Birthdays[msg.author.id].day;
                        var reformattedmonth = Number(birthmonth) + 1;
                        var infostr = "month/day"
                        var BDAYstr = infostr.replace("month",reformattedmonth).replace("day",birthDAY)
                    }
                    if(!Birthdays.hasOwnProperty(msg.author.id)){
                        BDAYstr = "No Data"
                    }
                }
            }
            if(!Birthdays.hasOwnProperty(key)){
                let BDAYstr = "No Data"
            }
            console.log(BDAYstr)
            fs.readFile("wdb.json", "UTF-8", (error, data) => {
                if(error){
                    console.error(error)
                }
                var pdata = JSON.parse(data)
                var warned = pdata.warned;
                for (var key in warned){
                    if(warned.hasOwnProperty(key)){
                        if(warned.hasOwnProperty(msg.author.id)){
                            var count = warned[msg.author.id].UserCt;
                            let infostr = "0"
                        var countstr = infostr.replace("0",count)
                        }
                        if(!warned.hasOwnProperty(msg.author.id)){
                            var countstr = 0
                        }
                    }
                }
                if(!warned.hasOwnProperty(key)){
                    var countstr = 0
                }
                console.log(countstr)
                GuildID.fetchMember(msg.author.id).then(member => {
                    const embed = new Discord.RichEmbed({
                        thumbnail: {
                          url: msg.author.avatarURL
                        },
                        title: msg.author.tag,
                        color: 4886754,
                        author: {
                          name: "Anthony's Server of Servitude ID CARD"
                        },
                        fields: [
                          {
                            name: "USER ID",
                            value: "```" + member.id + "```",
                            inline: true
                          },
                          {
                            name: "JOINED ON",
                            value: "```" + member.joinedAt.toDateString() + "```",
                            inline: true
                          },
                          {
                            name: "RANK",
                            value: "```" + member.highestRole.name + "```"
                          }
                          ,
                          {
                              name: "BIRTHDAY",
                              value: "```" + BDAYstr + "```",
                              inline: true
                          },
                          {
                              name: "WARNING COUNT",
                              value: "```" + countstr + "```",
                              inline: true
                          }
                        ]
                      })
                      member.send(embed)
                })
            })
    })
        msg.author.send({
            embed: {
                title: "Your commands as a **__Member__**",
                description: "My prefix is __!mb!__",
                color: 9498256,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "Ping",
                    value: "__**Usage:**!mb!ping__\nTest the ping",
                },
                {
                    name: "Ask MonkeBot(Yes/No)",
                    value: "__**Usage:** !mb!MonkeBot, <Any Yes/No>__\nAsk the bot a question. This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel",
                },
                {
                    name: "Hello",
                    value: "__**Usage:** !mb!Hello__\nSay hello to the bot!",
                },
                {
                    name: "How are you?",
                    value: "__**Usage:** !mb!How are you?__\nAsk the bot how it's feeling. This command replies from a random phrase from a database. Have a suggestion for a phrase? Suggest in the #suggestions channel",
                }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "```Current Version: 1.0.0"
                }
            }
        })
    }
})
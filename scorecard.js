let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
function processingleMatch(url){
    request(url, cb)
}


function cb(error, res, html) {
    if (error) {
        console.loig(error);
    }
    else {
        extractPlayerDetails(html);
    }
}
//date venue result

function extractPlayerDetails(html) {
    let seltool = cheerio.load(html);
    let detailsElements = seltool(".event .match-info.match-info-MATCH .description");
    let detailText = detailsElements.text();

    let detailArr = detailText.split(",");
    let venue = detailArr[1].trim();
    let date = detailArr[2].trim();
    // console.log(venue);
    // console.log(date);
    let resultElem = seltool(".event .match-info.match-info-MATCH .status-text");
    let result = resultElem.text();
    console.log(result);

    let NameofTeam = seltool(".Collapsible h5");
    let BatsmanTableofTeam = seltool(".Collapsible .table.batsman");
    for (let i = 0; i < NameofTeam.length; i++) {
        
        let allrowsofCurrentTeam = seltool(BatsmanTableofTeam[i]).find("tbody tr");
        for (let j = 0; j < allrowsofCurrentTeam.length; j++) {
            let allcols = seltool(allrowsofCurrentTeam[j]).find("td");
            if (allcols.length == 8) {
                let myteamName = seltool(NameofTeam[i]).text().split("INNINGS")[0].trim();
                myteamName = myteamName.trim();
                let opponentTeamNaem = i==0 ? seltool(NameofTeam[1]).text():seltool(NameofTeam[0]).text();
                opponentTeamNaem=opponentTeamNaem.split("INNINGS")[0].trim();
                
                let name = seltool(allcols[0]).text();
                let runs = seltool(allcols[2]).text();
                let balls = seltool(allcols[3]).text();
                let fours = seltool(allcols[5]).text();
                let sixes = seltool(allcols[6]).text();
                let sr = seltool(allcols[7]).text();

                console.log(`teamName ${myteamName} playernaem ${name} venue ${venue} date ${date} opponene ${opponentTeamNaem} 
                result ${result} runs ${runs} fours ${fours} sixes ${sixes} sr ${sr}`);
                // console.log(`-----------------------------------------------`);
                processPlayer(myteamName,name,venue,date,opponentTeamNaem,result,runs,balls,fours,sixes,sr);
            }
        }
    }
}

function processPlayer(myteamName,name,venue,date,opponentTeamNaem,result,runs,balls,fours,sixes,sr){

    let folderpath =path.join(__dirname,"ipl",myteamName);
    dirCreater(folderpath);
    let content = [];
    let matchobj = {
        myteamName,name,venue,date,opponentTeamNaem,result,runs,balls,fours,sixes,sr
    }
    let filePath = path.join(folderpath,name+"json");
    if(fs.existsSync(filePath)){
        let buffer = fs.readFileSync(filePath);
        content = JSON.parse(buffer);
    }
    content.push(matchobj);
    fs.writeFileSync(filePath,JSON.stringify(content));
}

function dirCreater(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}

module.exports={
    processingleMatch
}


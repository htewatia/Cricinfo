let request = require("request");
let cheerio = require("cheerio");
let scorecardobj = require("./scorecard");
function processAllMatch(url){
    request(url,cb);
    function cb(err,res,html){
        if(err){
            console.log(err);
        }
        else{
            extractAllScorecardLink(html);
        }
    }
}

function extractAllScorecardLink(html){
    let seltool = cheerio.load(html);
    let scorecardLinkArr = seltool("a[data-hover='Scorecard']");

    for(let i=0;i<scorecardLinkArr.length;i++){
        let link = seltool(scorecardLinkArr[i]).attr("href");
        let fulllink = "https://www.espncricinfo.com"+link;
        console.log(fulllink);
        scorecardobj.processingleMatch(fulllink);
    }
}

module.exports={
    pam: processAllMatch
}
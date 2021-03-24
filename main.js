let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let allmatchobj = require("./allmatch");
let folderpath = path.join(__dirname,"IPL");
dirCreater(folderpath);
let url = "https://www.cricinfo.com/series/ipl-2020-21-1210595";
request (url,cb);

function cb(error,res,html){
    if(error){
        console.loig(error);
    }
    else{
        extractAllMatchPageLink(html);
    }
}

function extractAllMatchPageLink(html){
    let seltool = cheerio.load(html);
    let nextPageAnchor = seltool(".widget-items.cta-link a");
    let link = nextPageAnchor.attr("href");
    let fulllink = "https://www.espncricinfo.com"+link;

    //console.log(fulllink);
    allmatchobj.pam(fulllink);
}

function dirCreater(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}
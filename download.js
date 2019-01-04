const http=require('http');
const uuidv1=require('uuid/v1');
const fs=require('fs');
const path=require('path');


const downloadPage= (url='https://surprise-7def6.firebaseapp.com/') => {
    console.log("Your page ",url," is getting downloaded");
    const fetchPage=(urlF,callback) => {
          http.get(urlF,(response) => {
              let buffer='';
              response.on('data',(chunk)=>{
                  buffer+=chunk;
              })
              response.on('end',()=>{
                  callback(null,buffer);
              })
          }).on('error',(error)=>{
              console.error(`Got error:- ${error.message}`);
              callback(error);
          })
    }
const foldername=uuidv1();
fs.mkdirSync(foldername);
fetchPage(url,(error,data)=>{
    if(error) return console.log(error);
    fs.writeFileSync(path.join(__dirname,foldername,'url.txt'),url);
    fs.writeFileSync(path.join(__dirname,foldername,'file.html'),data);
    console.log("Downloading in folder named:-",foldername);
})
}

downloadPage(process.argv[2]);
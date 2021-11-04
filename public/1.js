const { reject, resolve } = require("core-js/fn/promise")
const FileSaver = require("file-saver")

let readFilePromise = (filename) =>{
    fs.readFile(filename, (err, data)=>{
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    })
}

readFilePromise('1.json').then(data=>{
    return readFilePromise('2.json')
});


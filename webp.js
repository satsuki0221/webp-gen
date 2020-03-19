const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

const arr = []

function setArr(dir) {
  const filenames = fs.readdirSync(dir);
  filenames.forEach((filename) => {
    const fullPath = path.join(dir, filename);
    const stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      if (filename !== '.DS_Store') {
        if (filename.indexOf('.svg') < 0) {
          if (filename.indexOf('.webp') < 0) {
            arr.push(fullPath)
          }
        }
      }
    } else if (stats.isDirectory()) {
      setArr(fullPath);
    }
  });
}

const dir = process.cwd() + '/assets';
setArr(dir);

arr.forEach(a => {
  var b = a
  b = b.replace('.jpg', '.webp')
  b = b.replace('.gif', '.webp')
  b = b.replace('.png', '.webp')
  webp.cwebp(a,b,"-q 80",function(status,error)
  {
    //if conversion successful status will be '100'
    //if conversion fails status will be '101'
    console.log(status,error);
  });
})


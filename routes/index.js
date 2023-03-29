var express = require('express');
var router = express.Router();

const ID_KEY = 'SBAyE5SPkE1Fj10z9mIu';
const SECRET_KEY = 'FqL3cXfOxX';


const imageSet = async(name) => {
  // const word = req.query.query;
  const search = name
  const data = await fetch(`https://openapi.naver.com/v1/search/movie.json?query=${search}`, {
    headers: {
      'X-Naver-Client-Id': ID_KEY,
      'X-Naver-Client-Secret': SECRET_KEY,
      'Access-Control-Allow-Origin': '*'
    }
  })
  let dates = await data.json()
  let dateZero = await dates.items[0]
  result = await dateZero["image"]
  return result
}



/* GET home page. */
router.get('/filter/:data', async function(req, res, next) {
  const {data}= req.params
  try{
   const jinsungData = await fetch(`https://port-0-movie-sim-recommandation-6g2llfhupy60.sel3.cloudtype.app/${data}`)
   let datas = await jinsungData.json()
   let new_data = await JSON.parse(datas)
 
   let new_data2 = await new_data["data"]
   console.log(new_data2)
   const result = []
   const code = []
   for (let i = 0; i < new_data2.length; i++) {
       let data = new_data2[i]["title"]
       let codes = new_data2[i]["code"]
       result.push(data)
       code.push(codes)
       }
    const returns = []
    for (let i = 0; i < result.length; i++) {
        let data = await imageSet(result[i])
        let codes = code[i]
        returns.push({code: codes, data: data})
        }
  
    const result_real = {data : returns }
  
    res.send(result_real)
  }
  catch{
    res.send("진성님 api오류입니다.")
  }
});

module.exports = router;

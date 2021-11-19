export default function recordCount(data) {
    let cache = {};
  
    for (let d of data) {
      if (!(d in cache)) {
        cache[d] = 1;
      } else {
        cache[d] += 1;
      }
    }

    let result =[];
    for(let p in cache){
        if(cache.hasOwnProperty(p)){
            result.push({name:p,count:cache[p]})
        }
    }
    return result;
  }
  
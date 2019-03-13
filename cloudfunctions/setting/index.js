const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init();
const db = cloud.database()

exports.main = async (event,context) =>{
  try{
    if(event.bgimg){
      return await db.collection('userInfo').doc('XII8yXkPDdDCJ6tj').update({
        data: {
          bgimg:event.bgimg
        }
      })
    }
    if(event.hdimg){
      return await db.collection('userInfo').doc('XII8yXkPDdDCJ6tj').update({
        data: {
          hdimg: event.hdimg
        }
      })
    }
    if(event.name){
      return await db.collection('userInfo').doc('XII8yXkPDdDCJ6tj').update({
        data: {
          name: event.name
        }
      })
    }
    if(event.sign){
      return await db.collection('userInfo').doc('XII8yXkPDdDCJ6tj').update({
        data:{
          signature:event.sign
        }
      })
    }
    if(event.p_index){
      return await db.collection('userInfo').doc('XII8yXkPDdDCJ6tj').update({
        data:{
          p_index:event.p_index
        }
      })
    }
  }
  catch(e){
    console.log(e)
  }
  
}

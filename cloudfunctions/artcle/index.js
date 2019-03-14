const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init();
const db = cloud.database()

exports.main = async (event, context) => {
  console.log(event)
  try {
       return await db.collection('Arctic').add({
         data:{
           date:new Date(),
           detail: event.database
         }
         
       })
  }
  catch (e) {
    console.log(e)
  }

}

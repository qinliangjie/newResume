const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init();
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    return await db.collection('Arctic').where({
        _id:event._id
    }).remove()
  }
  catch (e) {
    console.log(e)
  }
}

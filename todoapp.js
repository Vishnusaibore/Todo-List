const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { defaults } = require('request')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs')
app.use(express.static("static"))

let defaultItems=[]
var items=[]

//MongoDB Database Connection With Moongoose
main().catch(err => console.log(err));
async function main() {
 mongoose.connect('mongodb://127.0.0.1:27017/todolistDB')
//Schema for Item
const itemSchema =  mongoose.Schema({
  name:String
})
const Item = mongoose.model("Item",itemSchema)
//default Items
const item1 = new Item(
  {name:"Welcome To Ur TodoList"}
)
const item2 = new Item({
  name:"Hit + icon To Add New Item"
})
const item3 = new Item({
  name:"⇐ Hit this to delete Item"
})

// CustomList Schema
const listSchema = mongoose.Schema({
  name:String,
  items:[itemSchema]
})

const List = mongoose.model("List",listSchema)

//TodoList Routing Scripts
app.get('/', (req, res) => {
  defaultItems=  Item.find().then(results => {
    // Process the results here
    defaultItems=results
    if(defaultItems.length===0)
  {
      Item.insertMany([item1,item2,item3])
      res.redirect("/")
  }
  else
  {
    res.render("list",{ListTitle:"Today",newListItems:defaultItems})
  }
  }).catch(error => {
    // Handle error
    console.log(error)
  })
     
})

//New List Creation
app.get("/custom",(req,res)=>{
  res.render("customlist")
})
//
app.get("/:CustomListName",(req,res)=>{
  const CustomListName = req.params.CustomListName

  List.findOne({name:CustomListName}).then(foundList=>{
    if(!foundList)
    {
      Item.find().then(results=>{
      defaultItems=results //console.log("Not Exists")
      
      const list = new List({
        name:CustomListName,
        items:defaultItems
      })
      list.save()
      
    }).catch(error=>{})
    res.redirect("/" + CustomListName) 
    }
    else
    {
      // console.log("Exists"+foundList.name)
      res.render("list",{ListTitle:foundList.name,newListItems:foundList.items})
    }
  }).catch(error=>{})

})


//Script for post route --> customLists Insertion
app.post("/",(req,res)=>{
  const itemName = req.body.newItem
  const listName = req.body.list
  
  const item= new Item({
    name:itemName
  })
  
  if(listName==="Today"){
    item.save()
  res.redirect("/")
  }else{
    List.findOne({name:listName}).then(foundList=>{
      // console.log(foundList)
      foundList.items.push(item)
      foundList.save()
      res.redirect("/" + listName)
    }).catch(err=>{})
  }
  
})

app.post("/mylist",(req,res)=>{
  const url = req.body.query
  res.redirect("/"+url)
})

//Script for post route --> CustomList Deletion
app.post("/delete",(req,res)=>{
const d_Item = req.body.delItem
const delListName = req.body.delList

if(delListName==="Today"){
Item.findOneAndDelete({ _id:d_Item }).then(results=>{// write ur code here
}).catch(error=>{console.log(error)})
res.redirect("/")
}
else
{
  List.findOneAndUpdate({name:delListName},{$pull:{items:{_id:d_Item}}}).then(res=>{}).catch(error=>{})
  res.redirect("/"+delListName)
}
})

} //End of async main() function

//Server Listening Port
app.listen(process.env.PORT || port, () => {
  console.log(`Dolist app listening on port ${port}`)
})
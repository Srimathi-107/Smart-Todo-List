let inputbox=document.getElementById("inputbox")
let add=document.getElementById("add")
let addtask=document.getElementById("addtask")
let update=document.getElementById("update")
let clear=document.getElementById("clear")
let error=document.getElementById("error")
let totaltask=document.getElementById("totaltask")
let all=document.getElementById("all")
let completed=document.getElementById("completed")
let pending=document.getElementById("pending")
let search=document.getElementById("search")
let taskarr=[],index=null;
error.textContent=""
add.addEventListener("click",()=>{
    if(inputbox.value===""){
        error.textContent="Please enter task"
        error.style.color="red"
        return;
    }
    let value=inputbox.value
    taskarr.push({
        id:Date.now(),
        task: value,
        completed: false
    })
    total(taskarr)
    inputbox.value=""
    localStorage.setItem("Tasks",JSON.stringify(taskarr))
    addtasks(taskarr)
    error.textContent=""
})

let data=JSON.parse(localStorage.getItem("Tasks"))
console.log(data)
if(data){
    taskarr=data
    addtasks(taskarr)
}
update.addEventListener("click",()=>{
    let value=inputbox.value
    if(index!==null){
        let t = taskarr.find((d)=>{
            return d.id === index
        })
        t.task=value
        localStorage.setItem("Tasks",JSON.stringify(taskarr))
        addtasks(taskarr)
        index=null
        total(taskarr)
    }
    inputbox.value=""
})

function addtasks(arr){
    addtask.innerHTML=""
    arr.forEach((d,i)=>{
        let div=document.createElement("div")
        div.className="eachtask"
        let input=document.createElement("input")
        input.id="checkbox"
        input.type="checkbox"
        input.checked = d.completed
        let p=document.createElement("p")
        p.className="eachtaskp"
        p.innerHTML=d.task
        if(d.completed){
            p.style.textDecoration="line-through"
        }
        input.addEventListener("change",()=>{
            d.completed=input.checked
            localStorage.setItem(
                "Tasks",
                JSON.stringify(taskarr)
            )
             if(d.completed){
                p.style.textDecoration="line-through"
            }else{
                p.style.textDecoration="none"
            }
            total(taskarr)
        })
        let edit=document.createElement("i")
        edit.textContent="✏️"
        edit.style.cursor="pointer"
        edit.addEventListener("click",()=>{
            index=d.id
            inputbox.value=d.task
            total(taskarr)
        })
        let del=document.createElement("i")
        del.innerHTML="🗑️"
        del.style.cursor="pointer"
        del.addEventListener("click",()=>{
            taskarr=taskarr.filter((f)=>f.id!==d.id)
            localStorage.setItem("Tasks",JSON.stringify(taskarr))
            addtasks(taskarr)
            total(taskarr)
        })
        addtask.append(div)
        div.append(input,p,edit,del)
    })
}

clear.addEventListener("click",()=>{
    taskarr=[]
    localStorage.setItem("Tasks",JSON.stringify(taskarr))
    addtasks(taskarr)
    total(taskarr)
})

function total(t){
    totaltask.textContent="Total Tasks : "+t.length
}
total(taskarr)


all.addEventListener("click",()=>{
    addtasks(taskarr)
    total(taskarr)
})

completed.addEventListener("click",()=>{
    let arr=taskarr.filter((f)=>{
        return f.completed===true
    })
    addtasks(arr)
    // localStorage.setItem("Completed",JSON.stringify(arr))
    total(arr)
})
pending.addEventListener("click",()=>{
    let penarr=taskarr.filter((f)=>{
        return f.completed===false
    })
    addtasks(penarr)
    // localStorage.setItem("Pending",JSON.stringify(penarr))
    total(penarr)
})

document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        add.click()
    }
})

search.addEventListener("input",()=>{
    let value=search.value.toLowerCase()
    let filter=taskarr.filter((f)=>f.task.toLowerCase().includes(value))
    addtasks(filter)
    total(filter)
})
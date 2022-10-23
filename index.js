let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
let leadsFromLocalStorage=JSON.parse( localStorage.getItem("myLeads") )
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value=null
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})
deleteBtn.addEventListener("dblclick",function(){
    myLeads=[]
    localStorage.clear()
    renderLeads(myLeads)
})
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)   
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

})
if(Boolean(leadsFromLocalStorage)==true){
    myLeads=leadsFromLocalStorage
    renderLeads(myLeads)
}
function renderLeads(leads){
let listItems = ""
for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
    <a target='_blank' href='  ${leads[i]} '>
      ${leads[i]}
    </a>
    </li>
     `
}
ulEl.innerHTML = listItems
}

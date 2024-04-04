let balance =document.getElementById("balance");
let inc_amt =document.getElementById("inc");
let exp_amt =document.getElementById("exp");
let description =document.getElementById("desc");
let amount =document.getElementById("amount");
let trans =document.getElementById("trans");
let form =document.getElementById("form");



let dummy_data =[
    {id:1,description:"petrol",amount:-100},
    {id:2,description:"salary",amount:25000},
    {id:3,description:"rent",amount:3000},
    {id:4,description:"groceries",amount:-100},
    {id:5,description:"milk",amount:-100},
];
let transactions  =dummy_data;
// console.log(transactions);

function loadtransactiondetails(transaction){
    // console.log(transaction);
    let sign = transaction.amount< 0 ?"-": "+";
    // console.log(sign);
    let item =document.createElement("li");
    item.classList.add(transaction.amount< 0 ? "exp":"inc");
    trans.appendChild(item);
    item.innerHTML=`${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button id="btn-del" onclick="removetrans(${transaction.id})">x</button>
    `;
}
function removetrans(id){
    if (confirm("are you sure you want to delete the transaction?")){
        transactions=transactions.filter((transaction)=>transaction.id != id)
        config();

    }
    else{
        return;
    }
}

function updateamount(){
   let total =transactions.map((transaction)=>transaction.amount);
//    console.log(total);
   let amounts=  total.reduce((acc,item)=>acc +=item,0).toFixed(2);
   console.log(amount);
   balance.innerHTML=`₹${amounts}` 
   let income = total.filter((item)=> item > 0).reduce((acc,item) =>acc+=item,0).toFixed(2);
   inc_amt.innerHTML=`₹${income}`
   let expensive = total.filter((item)=> item < 0).reduce((acc,item) =>acc+=item,0).toFixed(2);
   exp_amt.innerHTML=`₹${Math.abs(expensive)}`
}
function config(){  
    trans.innerHTML="";
    transactions.forEach(loadtransactiondetails)
    updateamount();

}


function addtransaction(){
    

    if(description.value=="" || amount.value==""){
        alert("please enter description and amount")
    }
    else{
        let data ={
            id:Math.floor(Math.random()*100),
            description:description.value,
            amount:amount.value, 
        };

        console.log(data);
        transactions.push(data);
        loadtransactiondetails(data);
        description.value="";
        amount.value="";
        updateamount();  
    }
}
// form.addEventListener("submit",addtransaction);
window.addEventListener("load",()=>{
    config();    
});

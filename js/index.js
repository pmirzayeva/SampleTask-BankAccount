const addBtn=document.querySelector("#addBtn")
const sendBtn=document.querySelector("#sendBtn")
const displayBtn=document.querySelector("#displayBtn")
const moneyInput=document.querySelector("#moneyInput")
const balanceEl=document.querySelector("#balanceEl")
const list=document.querySelector("#list")
const alertContainer = document.querySelector("#myAlert");
const alertContainer2 = document.querySelector("#myAlert2");
const enterBtn=document.querySelector("#enterBtn")



const bankAccount={

    balance:0,
    limit:1000,
    info:[],
    date:new Date(),
    userNameInfo:[],


    addMoney: function(m){
        if(this.balance  > this.limit || isNaN(m)){

            console.log("invalid");

            alertContainer.classList.remove("d-none");
            setTimeout(function() {
                alertContainer.classList.add("d-none"); // Hide the alert
              }, 2000);
        
              return;
    }

        this.balance += m

        const history={
            type:"Add",
            amount:m,
            created:this.date,
            
        }

        this.info.push(history)

        return this.balance
    },


    sendMoney:function(m){

        checkValid=()=>{
            if(this.balance -m < 0){
                console.log("insufficient");

                alertContainer2.classList.remove("d-none");
                setTimeout(function() {
                    alertContainer2.classList.add("d-none"); // Hide the alert
                  }, 2000);
            
                  return;
            }

            this.balance -= m


            const history={
                type:"Send",
                amount:m,
                created:this.date,
                
            }
            this.info.push(history)

        }
        checkValid()
        return this.balance
    },
    

    display:function(m){

        handleMonitor=()=>{
            console.log(bankAccount.balance);
            console.log(bankAccount.info);
        }
        handleMonitor()
        return this.balance
    },


    displayed:function(){
        infoContent.classList.add("d-none")
        mainContent.classList.remove("d-none")
    },

    displayUser:function(){
        title.innerHTML=`Welcome,${userNameInfo.value}!`
    },

}




addBtn.addEventListener("click",function(){
    const value=moneyInput.value
    bankAccount.addMoney(+value)
    moneyInput.value=""
    balanceEl.innerHTML=bankAccount.display()


})

sendBtn.addEventListener("click",function(){
    const value=moneyInput.value
    bankAccount.sendMoney(+value)
    moneyInput.value=""

    balanceEl.innerHTML=bankAccount.display()
})

displayBtn.addEventListener("click",function(){
    balanceEl.innerHTML=bankAccount.display()

    const newContent=bankAccount.info.map((item)=>
        `<tr>
        <td>${item.type}</td>
        <td class="text-${item.type=="Add"?"success":"danger"}">${item.type == "Add" ? "+" + item.amount:"-" +item.amount}</td>
        <td>${convertTime(item.created)}</td>
      </tr>`
    ).join("")
 
    list.innerHTML=newContent
})


enterBtn.addEventListener("click",function(e){
    e.preventDefault()
    bankAccount.displayed()
    bankAccount.displayUser()
})








/////--------- DATE -------------///

function convertTime(dateFormat) {
    const date = new Date(dateFormat);
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${String(date.getMinutes()).padStart(2, "0")} ${ampm}`;
  
    const result = `${formattedDate}, ${formattedTime}`;
    
    return result;
  }


  


  




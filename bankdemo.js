
var handlers=require("./handler")     // customized

var events=require("events")           // inbuilt
var emitter=new events.EventEmitter();

class BankAccount{

    constructor(Initialbalance=0)
    {
    this.balance=Initialbalance;
    };

    monitor()
    {

        if(this.balance<5000)
        {
            //handlers.blockaccount();
            //console.log("Insufficient Balance");
            emitter.emit("Underbalance !!");
        }
        else if(this.balance>500000)
        {
            //handlers.incometax();
            //console.log("Pay Income tax");
           emitter.emit("Overbalance !!");
        }
    }
    deposit(amount)
    {
        this.balance = this.balance + amount;
        this.monitor();
        return this.balance;
    };

    withdraw(amount)
    {

        this.balance = this.balance - amount;
        this.monitor();
        return this.balance;
    };

    getbalance()
    {

        return this.balance;
    };
};

//event emitter 
// step 1 configuation
emitter.on("Underbalance !!",handlers.blockaccount);
emitter.on("Underbalance !!",handlers.Sendsms);
emitter.on("Overbalance !!",handlers.incometax);

//create objects
const  account=new  BankAccount(1000);
//account.deposit(1000000);
account.withdraw(500);
console.log(account.getbalance());
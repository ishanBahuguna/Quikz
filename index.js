
const startAt = Date.now()+15000;
console.log(startAt)
let timeNow;

const sleep = () => new Promise(resolve => setTimeout(resolve , 5000));

const main = async () => {
    // await sleep();
    timeNow = startAt - Date.now()
    console.log(timeNow)
}

main()
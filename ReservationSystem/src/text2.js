let data = [
    "aaaaa",
    "bbbbbb",

]
let newdata = [];
for (item in data) {
    let oneObj = {
        value: data[item],
        label: data[item],
    }
    newdata.push(oneObj)

}
console.log(newdata);
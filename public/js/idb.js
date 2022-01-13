let db;
const request = indexedDB.open('budget_tracker', 1)

request.onupgradeneeded = function(event){
    const db = event.target.result;
    db.createObjectStore('new data', {autoIncrement: true})

}

request.onsuccess = function(event){
    db = event.target.result;
    if(navigator.onLine){
        // uploadData
    }
};

request.onerror = function(event){
    console.log(event.target.errorCode)
}

function saveRecord(record){
    const transaction = db.transaction(['new_data'], 'readwrite')

    const dataObjectSotre = transactionobjectStore('new_data');

    dataObjectSotre.add(record)
}
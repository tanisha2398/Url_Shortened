class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
  randomStr(len, arr) {
    var ans = "";
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
  consistentValue(value) {
    var valueArray = this.valueof();
    if (valueArray === undefined) {
      return value;
    } else {
      const n = valueArray.includes(value);
      if (n) {
        let value = this.randomStr(
          (key.length % 10) + 1,
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        );
        consistentValue(value);
      } else {
        return value;
      }
    }
  }
  set(key) {
    let address = this._hash(key);
    // console.log("addresss of", key, "is", address);

    let value = this.randomStr(
      (key.length % 6) + 1,
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    );
    let val = this.consistentValue(value);

    console.log(key, "=", val);

    if (!this.data[address]) {
      this.data[address] = [];
      // this.data[address].push([key, value]);
    }
    this.data[address].push([key, val]); // console.log(this.data);
  }
  get(key) {
    let address = this._hash(key);
    const currentBucket = this.data[address];
    // console.log(currentBucket);
    if (currentBucket !== undefined) {
      if (currentBucket.length) {
        for (let i = 0; i < currentBucket.length; i++) {
          if (currentBucket[i][0] === key) {
            console.log(key, "=", currentBucket[i][1]);
            return currentBucket[i][1];
          }
        }
        this.set(key);
      }
    } else {
      this.set(key);
    }
    // return undefined;
  }
  key() {
    let keyArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        for (let j = 0; j < this.data[i].length; j++)
          keyArray.push(this.data[i][j][0]);
      }
    }
    console.log(keyArray);
  }

  valueof() {
    let valueArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        for (let j = 0; j < this.data[i].length; j++)
          valueArray.push(this.data[i][j][1]);
      }
    }
    // console.log(valueArray);
  }
}

const myHashTable = new HashTable(1000);
myHashTable.get(
  "https://www.geeksforgeeks.org/generate-random-alpha-numeric-string-in-javascript/"
);

myHashTable.get(
  "https://www.ques10.com/p/3781/explain-different-file-access-methods-1/"
);
myHashTable.get(
  "https://hackernoon.com/10-data-structure-algorithms-and-programming-courses-to-crack-any-coding-interview-e1c50b30b927"
);
myHashTable.get(
  "https://www.ques10.com/p/3781/explain-different-file-access-methods-1/"
);
// myHashTable.key();
// myHashTable.valueof();

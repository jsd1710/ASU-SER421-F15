function MyClass(n1) { this.foo = n1; }
var m = new MyClass(10);
console.log(m.bar);
m.bar=20;
console.log(m.bar);
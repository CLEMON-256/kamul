# Syntax Comparison Guide: TypeScript vs Kotlin vs C#

This guide provides a quick reference comparing key syntax elements across TypeScript, Kotlin, and C#.

## 1. Variables & Constants

| Feature | TypeScript | Kotlin | C# |
| :--- | :--- | :--- | :--- |
| **Mutable Variable** | `let x: number = 10;` | `var x: Int = 10` | `int x = 10;` or `var x = 10;` |
| **Immutable / Constant** | `const pi: number = 3.14;` | `val pi: Double = 3.14` | `const double pi = 3.14;` or `readonly` |
| **Type Inference** | `let name = "Alice";` | `val name = "Alice"` | `var name = "Alice";` |

## 2. Functions

### TypeScript
```typescript
function add(a: number, b: number): number {
    return a + b;
}

// Arrow Function
const multiply = (a: number, b: number): number => a * b;
```

### Kotlin
```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}

// Single Expression Body
fun multiply(a: Int, b: Int) = a * b
```

### C#
```csharp
int Add(int a, int b) 
{
    return a + b;
}

// Lambda / Expression-bodied member
Func<int, int, int> multiply = (a, b) => a * b;
```

## 3. String Interpolation

| Language | Syntax | Example |
| :--- | :--- | :--- |
| **TypeScript** | Backticks `` ` `` + `${}` | `` `Hello, ${name}` `` |
| **Kotlin** | Double quotes `""` + `$`/`${}` | `"Hello, $name"` or `"Hello, ${obj.name}"` |
| **C#** | `$` prefix + `{}` | `$"Hello, {name}"` |

## 4. Null Safety

### TypeScript
```typescript
let name: string | null = null;
// Safe call
console.log(name?.length); 
// Null assertion (risky)
console.log(name!.length);
```

### Kotlin
```kotlin
val name: String? = null
// Safe call
println(name?.length)
// Elvis operator (default value)
val len = name?.length ?: 0
```

### C#
```csharp
string? name = null;
// Safe call
Console.WriteLine(name?.Length);
// Null-coalescing (default value)
int len = name?.Length ?? 0;
```

## 5. Classes & Interfaces

### TypeScript
```typescript
interface IUser {
    id: number;
    name: string;
}

class User implements IUser {
    constructor(public id: number, public name: string) {}
}
```

### Kotlin
```kotlin
interface IUser {
    val id: Int
    val name: String
}

class User(override val id: Int, override val name: String) : IUser
```

### C#
```csharp
interface IUser 
{
    int Id { get; }
    string Name { get; }
}

class User : IUser
{
    public int Id { get; }
    public string Name { get; }

    public User(int id, string name)
    {
        Id = id;
        Name = name;
    }
}
```

## 6. Loops

### TypeScript
```typescript
// For-of (Iterate items)
for (const item of items) { ... }
```

### Kotlin
```kotlin
// For-in
for (item in items) { ... }
```

### C#
```csharp
// Foreach
foreach (var item in items) { ... }
```

## 7. Async / Await

### TypeScript
```typescript
async function fetchData(): Promise<Data> {
    const response = await api.get();
    return response.data;
}
```

### Kotlin
```kotlin
// Uses Coroutines
suspend fun fetchData(): Data {
    val response = api.get()
    return response.data
}
```

### C#
```csharp
async Task<Data> FetchDataAsync()
{
    var response = await api.GetAsync();
    return response.Data;
}
```

## 8. Switch / Match / Conditional

### TypeScript
```typescript
// Switch Statement
switch (color) {
    case "red": console.log("Hot"); break;
    case "blue": console.log("Cold"); break;
    default: console.log("Neutral");
}
```

### Kotlin
```kotlin
// When Expression
val result = when (color) {
    "red" -> "Hot"
    "blue" -> "Cold"
    else -> "Neutral"
}
```

### C#
```csharp
// Switch Expression (Modern C#)
var result = color switch 
{
    "red" => "Hot",
    "blue" => "Cold",
    _ => "Neutral"
};
```

## 9. Collections

### TypeScript
```typescript
// Arrays only
const numbers: number[] = [1, 2, 3];
const map = new Map<string, number>();
map.set("one", 1);
```

### Kotlin
```kotlin
// Immutable List (standard)
val numbers = listOf(1, 2, 3)
// Mutable List
val mutableNumbers = mutableListOf(1, 2, 3)
// Map
val map = mapOf("one" to 1)
```

### C#
```csharp
// List
var numbers = new List<int> { 1, 2, 3 };
// Dictionary
var map = new Dictionary<string, int> 
{
    { "one", 1 }
};
```

## 10. Generics

### TypeScript
```typescript
class Box<T> {
    content: T;
    constructor(val: T) { this.content = val; }
}
```

### Kotlin
```kotlin
class Box<T>(val content: T)
```

### C#
```csharp
class Box<T>
{
    public T Content { get; set; }
    public Box(T content) => Content = content;
}
```

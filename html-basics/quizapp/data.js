const questions = [
    {
        id: 1,
        question: "Was ist der Wert von `typeof null`?",
        answers: [
            {id: 1, option: "number", isCorrect: false },
            {id: 2, option: "object", isCorrect: true },
            {id: 3, option: "null", isCorrect: false }
        ]
    },
    {
        id: 2,
        question: "Was gibt `2 + '2'` zurück?",
        answers: [
            {id: 1, option: "4", isCorrect: false },
            {id: 2, option: "22", isCorrect: true },
            {id: 3, option: "Error", isCorrect: false },
        ]
    },
    {
        id: 3,
        question: "Welche Methode wird verwendet, um einen neuen Array mit den Ergebnissen der Funktion für jedes Element zu erstellen?",
        answers: [
            {id: 1, option: "map()", isCorrect: true },
            {id: 2, option: "forEach()", isCorrect: false },
            {id: 3, option: "filter()", isCorrect: false },
        ]
    },
    {
        id: 4,
        question: "Wie deklariert man eine Funktion in JavaScript?",
        answers: [
            {id: 1, option: "function myFunction() { }", isCorrect: true },
            {id: 2, option: "const myFunction = function() { }", isCorrect: false },
            {id: 3, option: "myFunction: function() { }", isCorrect: false },
        ]
    },
    {
        id: 5,
        question: "Was gibt `undefined == null` zurück?",
        answers: [
            {id: 1, option: "true", isCorrect: true },
            {id: 2, option: "false", isCorrect: false },
            {id: 3, option: "null", isCorrect: false }
        ]
    },
    {
        id: 6,
        question: "Wie überprüft man, ob ein Objekt eine bestimmte Eigenschaft hat?",
        answers: [
            {id: 1, option: "obj.hasOwnProperty('property')", isCorrect: true },
            {id: 2, option: "obj.property !== undefined", isCorrect: false },
            {id: 3, option: "All of the above", isCorrect: false }
        ]
    },
    {
        id: 7,
        question: "Welche Funktion wird verwendet, um einen String in ein Integer umzuwandeln?",
        answers: [
            {id: 1, option: "parseInt()", isCorrect: true },
            {id: 2, option: "parseFloat()", isCorrect: false },
            {id: 3, option: "Number()", isCorrect: false },
        ]
    }
];


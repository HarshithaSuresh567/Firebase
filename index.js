// Firebase Config (Replace with YOUR project settings!)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function addDummyBooks() {
    const books = [
        {
            title: "Atomic Habits",
            author: "James Clear",
            price: 450,
            coverImageURL: "https://m.media-amazon.com/images/I/81F90H7hn0L.jpg"
        },
        {
            title: "The Alchemist",
            author: "Paulo Coelho",
            price: 300,
            coverImageURL: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
        },
        {
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            price: 350,
            coverImageURL: "https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg"
        },
        {
            title: "Ikigai",
            author: "Héctor García",
            price: 400,
            coverImageURL: "https://m.media-amazon.com/images/I/71tbalAHYOL.jpg"
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            price: 500,
            coverImageURL: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg"
        }
    ];

    books.forEach(book => {
        db.collection("books").add(book);
    });

    alert("Dummy books added!");
}

// ------------------------------------
// ➕ Add a New Book
// ------------------------------------
function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = document.getElementById("price").value;
    const imageURL = document.getElementById("imageURL").value;

    if (!title || !author || !price || !imageURL) {
        alert("Please fill all fields!");
        return;
    }

    db.collection("books").add({
        title,
        author,
        price: Number(price),
        coverImageURL: imageURL
    }).then(() => {
        alert("Book added!");
    });
}

// ------------------------------------
// 📌 Fetch & Display Books
// ------------------------------------
function loadBooks() {
    db.collection("books").onSnapshot(snapshot => {
        let output = "";
        snapshot.forEach(doc => {
            const b = doc.data();
            output += `
                <div class="card">
                    <img src="${b.coverImageURL}">
                    <h3>${b.title}</h3>
                    <p><b>Author:</b> ${b.author}</p>
                    <p><b>Price:</b> ₹${b.price}</p>
                </div>
            `;
        });
        document.getElementById("bookList").innerHTML = output;
    });
}

loadBooks();

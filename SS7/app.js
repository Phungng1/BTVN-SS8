console.log("DA CHAY VAO APP.JS");

//Thiet ke lai ket noi firebase
 // Import the functions you need from the SDKs you need

 import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"

//  import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

 
 // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
 
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA7apuOUGk5VU1H5sVqjlGPEgdsQx-0TMg",
    authDomain: "nps-jsi18-phong.firebaseapp.com",
    projectId: "nps-jsi18-phong",
    storageBucket: "nps-jsi18-phong.appspot.com",
    messagingSenderId: "191795789089",
    appId: "1:191795789089:web:1770e47c8d164dd5761260",
    measurementId: "G-HJ6825JS83"
  };
 
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);//khoi tao firebase
 const db = getFirestore(app)//ket noi va khoi tao firestore

 const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to render tasks
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${task.description}</span>
            <button class="deleteBtn" data-id="${task.id}">Xóa</button>
        `;
    taskList.appendChild(li);

    // Add event listener to delete button
    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id); /// Hàm xóa task
    });
  });
}

// Hàm cập nhật dữ liệu mới nhất trên db
const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  // console.log("querySnapshot: ", querySnapshot); /// Để xem nó là gì?
  const tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    description: doc.data().description,
  }));
  renderTasks(tasks); /// Cập nhật lại giao diện
};

// Function to add a task to Firestore
const addTask = async (description) => {
  await addDoc(collection(db, "tasks"), { description })
  getTasks(); /// Lấy dữ liệu mới nhất từ Database về web.
  taskInput.value = "";

};






//// Hàm xóa dữ liệu khi bấm nút delete
const deleteTask = (id) => {
  const docRef = doc(db, "tasks", id);

  deleteDoc(docRef)
    .then(() => {
      console.log("Entire Document has been deleted successfully.");
      getTasks(); /// Lấy dữ liệu mới nhất từ Database về web.
    })
    .catch((error) => {
      console.log(error);
    });
};

// Lắng nghe sự kiện khi người dùng lick vào nút thêm task => gọi hàm thêm task vào database
addTaskBtn.addEventListener("click", () => {
  const description = taskInput.value.trim();
  if (description !== "") {
    addTask(description);
  }
});

// Gọi hàm lấy dữ liệu mới nhất từ database
getTasks();
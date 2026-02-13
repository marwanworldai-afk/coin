/***********************
 * تهيئة الداتا الأساسية
 ***********************/
 let users = JSON.parse(localStorage.getItem("users")) || {};

 // إنشاء الأدمن الرئيسي لو مش موجود
 if (!users["kkkk"]) {
     users["kkkk"] = {
         password: "4444",
         balance: 1000000,
         role: "admin"
     };
     localStorage.setItem("users", JSON.stringify(users));
 }
 
 /***********************
  * عناصر الصفحة
  ***********************/
 const loginForm = document.getElementById("login-form");
 const signupForm = document.getElementById("signup-form");
 const loginError = document.getElementById("login-error");
 const signupError = document.getElementById("signup-error");
 const cancelBtn = document.getElementById("Cancel");
 
 // أزرار التبديل بين تسجيل الدخول وتسجيل جديد
 document.getElementById("show-signup").onclick = () => {
     loginForm.classList.add("hidden");
     signupForm.classList.remove("hidden");
     loginError.textContent = "";
 };
 
 document.getElementById("show-login").onclick = () => {
     signupForm.classList.add("hidden");
     loginForm.classList.remove("hidden");
     signupError.textContent = "";
 };
 
 /***********************
  * تسجيل مستخدم جديد
  ***********************/
 signupForm.addEventListener("submit", function (e) {
     e.preventDefault();
 
     let username = document.getElementById("signup-username").value.trim();
     let password = document.getElementById("signup-password").value.trim();
 
     if (users[username]) {
         signupError.textContent = "اسم المستخدم موجود بالفعل";
         return;
     }
 
     users[username] = {
         password: password,
         balance: 0,
         role: "user"
     };
 
     localStorage.setItem("users", JSON.stringify(users));
 
     alert("تم إنشاء الحساب بنجاح");
     signupForm.reset();
     signupForm.classList.add("hidden");
     loginForm.classList.remove("hidden");
 });
 
 /***********************
  * تسجيل الدخول
  ***********************/
 loginForm.addEventListener("submit", function (e) {
     e.preventDefault();
 
     let username = document.getElementById("login-username").value.trim();
     let password = document.getElementById("login-password").value.trim();
 
     // الحساب الرئيسي الملكي
     if (username === "coin" && password === "000") {
         localStorage.setItem("currentUser", username);
         window.location.href = "owner.html"; // صفحة الملكي
         return;
     }
 
     // الحسابات العادية
     let usersData = JSON.parse(localStorage.getItem("users")) || {};
     if (!usersData[username]) {
         loginError.textContent = "اسم المستخدم غير موجود";
         return;
     }
 
     if (usersData[username].password !== password) {
         loginError.textContent = "كلمة المرور غير صحيحة";
         return;
     }
 
     // حفظ المستخدم الحالي
     localStorage.setItem("currentUser", username);
 
     // التحويل للعبة
     window.location.href = "game.html";
 });
 
 /***********************
  * زرار Cancel
  ***********************/
 if (cancelBtn) {
     cancelBtn.onclick = () => {
         document.getElementById("login-username").value = "";
         document.getElementById("login-password").value = "";
         loginError.textContent = "";
     };
 }
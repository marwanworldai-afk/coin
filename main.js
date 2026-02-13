

    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getDatabase, ref, set, get, child, update, push, remove, onValue } 
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
    
    // ---------------- Firebase ----------------
    const firebaseConfig = {
      apiKey: "AIzaSyB9mzy7VtnJV28qawDMYYEfTr8guf9Z5hQ",
      authDomain: "coinpay-3f182.firebaseapp.com",
      databaseURL: "https://coinpay-3f182-default-rtdb.firebaseio.com",
      projectId: "coinpay-3f182",
      storageBucket: "coinpay-3f182.firebasestorage.app",
      messagingSenderId: "9785521136",
      appId: "1:9785521136:web:117b57499cb35ba5db6335"
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    
    let currentUser = localStorage.getItem("currentUser");
    if(!currentUser){ alert("لازم تسجل دخول"); location.href="index.html"; }
    
    // ---------------- عناصر الصفحة ----------------
    const balanceEl = document.getElementById("balance");
    
    // =================🔥 أهم جزء (حل المشكلة) =================
    
    // متابعة بيانات اللاعب لايف (ده اللي يخلي الخصم يشتغل فورًا)
    onValue(ref(db, "users/" + currentUser), (snapshot)=>{
        const data = snapshot.val();
        if(!data) return;
    
        // تحديث الرصيد
        balanceEl.textContent = "رصيدك: " + (data.balance || 0);
    
        // ✅ لو اتعمله حظر يترمي بره
        if(data.blocked){
            alert("تم حظرك من اللعبة 🚫");
            localStorage.removeItem("currentUser");
            location.href="index.html";
        }
    });
    
    // ================= حالة الأونلاين =================
    
    // لما يفتح الصفحة يبقى أونلاين
    update(ref(db,"users/"+currentUser),{
        online: true
    });
    
    // لما يقفل الصفحة يبقى أوفلاين
    window.addEventListener("beforeunload", ()=>{
        update(ref(db,"users/"+currentUser),{
            online: false
        });
    });
    
    // ================= باقي الكود زي ما هو =================
    
    // (تحويل - إشعارات - إيداع... سيبه زي ما عندك)
    

    
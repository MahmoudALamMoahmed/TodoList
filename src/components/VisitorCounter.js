import React, { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // "2025-04-07"
    const lastVisit = localStorage.getItem("lastVisitDate");

    if (lastVisit !== today) {
      // أول زيارة لهذا اليوم → نزيد العداد
      fetch("https://api.countapi.xyz/hit/todo-macoding.netlify.app/homepage")
        .then((res) => res.json())
        .then((data) => {
          setVisits(data.value);
          localStorage.setItem("lastVisitDate", today);
        })
        .catch((err) => console.error("Error updating visit count:", err));
    } else {
      // زيارة مكررة بنفس اليوم → نقرأ الرقم فقط
      fetch("https://api.countapi.xyz/get/todo-macoding.netlify.app/homepage")
        .then((res) => res.json())
        .then((data) => {
          setVisits(data.value);
        })
        .catch((err) => console.error("Error fetching visit count:", err));
    }
  }, []);

  return (
    <div
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      👁️‍🗨️ عدد الزيارات : {visits}
      <div style={{ marginTop: "15px" }}>
        نسألكم الدعاء لأبي ( الأستاذ : علم محمد ) بالرحمة والمغفرة{" "}
      </div>
    </div>
  );
};

export default VisitorCounter;

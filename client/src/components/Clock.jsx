import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Clock() {
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const sec = String(now.getSeconds()).padStart(2, "0");
      document.getElementById(
        "clock"
      ).textContent = `${hours}:${minutes}:${sec}`;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/clock/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, description }),
      });
      const result = await response.json();
      setMessage(result.message);
      toast.success("Time Successfully Submitted  !");
      setDescription("");
      setTime("");
    } catch (error) {
      setMessage("Error saving data", error);
      toast.error("Error saving data",error);
    }
  };

  return (
    <div className="w-[90%] min-h-[200px] h-auto m-auto items-center justify-center bg-slate-100 flex flex-col">
      <h1
        id="clock"
        style={{ fontSize: "2em", textAlign: "center", marginTop: "20px" }}
      >
        00:00{" "}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[50%] min-h-[200px] h-auto bg-yellow-100 flex flex-col justify-start"
      >
        <label className="text-base text-orange-700 mb-1 font-bold mt-1">
          Enter Time (HH:MM) And in 24 hours format   
        </label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="h-[40px] rounded-lg bg-slate-300 text-blue-600 outline-none p-3 active:outline-none"
        />
        <label className="text-base text-orange-700 mb-1 font-bold mt-1">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className=" rounded-lg bg-slate-300 text-blue-600 outline-none p-3 active:outline-none"
          rows="5"
        ></textarea>
        {/* <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /> */}
        <button
          type="submit"
          className="w-[100px] h-[50px] bg-blue-400 text-white rounded m-auto mt-5 flex items-center justify-center mb-5"
        >
          Save Time
        </button>
      </form>
      {message && (
        <p
          style={{ textAlign: "center" }}
          className="text-red-700 text-2xl mb-10"
        >
          {message} 
        </p>
      )}
    </div>
  );
}

export default Clock;

import { io } from "socket.io-client";

const token = localStorage.getItem("access_token");  // o donde lo guardes
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  query: { token },
});

socket.on("connect", () => {
  console.log("🔌 Socket conectado:", socket.id);
});
socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión:", err);
});

export default socket;

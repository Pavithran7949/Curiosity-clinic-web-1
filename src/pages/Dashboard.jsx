import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <button
          onClick={() => navigate("/project/1")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Project
        </button>
      </div>
    </MainLayout>
  );
}
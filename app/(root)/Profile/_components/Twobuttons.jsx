import { Button } from "@nextui-org/react";
import { ShieldAlert, LogOut } from "lucide-react";
export default function App() {
  return (
    <div className="flex gap-14 items-center">
      <Button
        size="lg"
        style={{
          backgroundColor: "#7a55fe",
        }}
        endContent={<ShieldAlert />}
      >
        save changes
      </Button>
      <Button
        size="lg"
        color="danger"
        variant="bordered"
        startContent={<LogOut />}
      >
        LogOut
      </Button>
    </div>
  );
}

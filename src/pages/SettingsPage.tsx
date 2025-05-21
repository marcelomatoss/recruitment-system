import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Modo escuro</Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Notificações por e-mail</Label>
          <Switch
            id="notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

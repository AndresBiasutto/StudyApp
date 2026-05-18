import Content from "../../components/molecules/content.molecule";
import SettingsForm from "../../components/organisms/forms/settingsForm.organism";
import { useAppSelector } from "../../../hooks/UseStore.hook";

const Settings = () => {
  const selectedUserId = useAppSelector((state) => state.auth.selected?.id_user);

  return (
    <Content title="Configuración">
        <SettingsForm key={selectedUserId ?? "anonymous-settings"} />
    </Content>
  );
};

export default Settings;

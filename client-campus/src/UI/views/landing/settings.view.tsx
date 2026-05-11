import Content from "../../components/molecules/content.molecule";
import Ptxt from "../../components/atoms/P.atom";
import SettingsForm from "../../components/organisms/forms/settingsForm.organism";
import { useAppSelector } from "../../../hooks/UseStore.hook";

const Settings = () => {
  const selectedUserId = useAppSelector((state) => state.auth.selected?.id_user);

  return (
    <Content title="Configuración">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded bg-lightSecondary p-6 dark:bg-darkSecondary">
        <Ptxt
          text="Editá tus datos personales"
          aditionalStyle="mb-4 text-center"
        />
        <SettingsForm key={selectedUserId ?? "anonymous-settings"} />
      </div>
    </Content>
  );
};

export default Settings;
